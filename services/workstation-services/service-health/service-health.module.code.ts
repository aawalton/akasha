import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"
import { everyService } from "../service-reading/service-reading.module.code.ts"
import { isScheduled, type Service } from "../unit-writing/unit-writing.module.code.ts"

const SERVICE_SUFFIX = ".service"
const ID = "Id"
const ACTIVE_STATE = "ActiveState"
const RESULT = "Result"
const WELL = new Set(["active", "activating", "reloading"])
const UNBOUND = "unbound"

export type UnitState = {
  readonly activeState: string
  readonly result: string
}

export type Watched = {
  readonly slug: string
  readonly unit: string
  readonly pagePath: string
  readonly scheduled: boolean
  readonly unbound: readonly string[]
}

export type Health = {
  readonly slug: string
  readonly unit: string
  readonly pagePath: string
  readonly broken: string | null
}

export function unboundAt(root: string, pagePath: string): readonly string[] {
  const held = uncommittedIn(root, pagePath)?.[UNBOUND]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function watchedIn(root: string, services: readonly Service[]): readonly Watched[] {
  const found: Watched[] = []
  for (const one of services) {
    if (!one.service.enabled) continue
    found.push({
      slug: one.service.slug,
      unit: `${one.service.slug}${SERVICE_SUFFIX}`,
      pagePath: one.pagePath,
      scheduled: isScheduled(one),
      unbound: unboundAt(root, one.pagePath),
    })
  }
  return found
}

export function statesIn(text: string): ReadonlyMap<string, UnitState> {
  const held = new Map<string, UnitState>()
  for (const block of text.trim().split("\n\n")) {
    const said = new Map<string, string>()
    for (const line of block.split("\n")) {
      const mark = line.indexOf("=")
      if (mark > 0) said.set(line.slice(0, mark), line.slice(mark + 1))
    }
    const id = said.get(ID)
    if (id === undefined) continue
    held.set(id, { activeState: said.get(ACTIVE_STATE) ?? "", result: said.get(RESULT) ?? "" })
  }
  return held
}

export function brokenIn(one: Watched, state: UnitState | undefined): string | null {
  if (state === undefined) return `${one.unit} is no unit systemd knows`
  if (state.activeState === "failed") {
    return `${one.unit} failed, and systemd says \`${state.result}\``
  }
  if (one.unbound.length > 0) {
    return `${one.unit} is not listening at ${one.unbound.join(", ")}, which its page states`
  }
  if (one.scheduled) return null
  if (WELL.has(state.activeState)) return null
  return `${one.unit} is \`${state.activeState}\` rather than running`
}

export function healthIn(
  watched: readonly Watched[],
  states: ReadonlyMap<string, UnitState>
): readonly Health[] {
  return watched.map((one) => ({
    slug: one.slug,
    unit: one.unit,
    pagePath: one.pagePath,
    broken: brokenIn(one, states.get(one.unit)),
  }))
}

export function showing(units: readonly string[]): string {
  if (units.length === 0) return ""
  return ran(["systemctl", "--user", "show", ...units, "-p", `${ID},${ACTIVE_STATE},${RESULT}`]).out
}

export function healthFor(
  root: string,
  show: (units: readonly string[]) => string = showing
): readonly Health[] | string {
  const read = everyService(root)
  if ("refused" in read) return read.refused
  const watched = watchedIn(root, read.services)
  return healthIn(watched, statesIn(show(watched.map((one) => one.unit))))
}
