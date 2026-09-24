import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  beating,
  beatOn,
  windowMsIn,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import { everyService } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import {
  isScheduled,
  type Service,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const SERVICE_SUFFIX = ".service"
const ID = "Id"
const ACTIVE_STATE = "ActiveState"
const RESULT = "Result"
const STATE_CHANGE = "StateChangeTimestamp"
const UNIX_STAMP = "--timestamp=unix"
const A_SECOND = 1000
const RUNNING = new Set(["active", "activating", "reloading"])
const SUCCESS = "success"
export const SETTLE_MS = 120_000
const UNBOUND = "unbound"

export type UnitState = {
  readonly activeState: string
  readonly result: string
  readonly changedAt: string | null
}

export type Watched = {
  readonly slug: string
  readonly unit: string
  readonly pagePath: string
  readonly scheduled: boolean
  readonly unbound: readonly string[]
  readonly worksWithinMs: number | null
  readonly workedAt: string | null
  readonly told: boolean
}

export type Health = {
  readonly slug: string
  readonly unit: string
  readonly pagePath: string
  readonly broken: string | null
  readonly told: boolean
}

function unboundAt(root: string, pagePath: string): readonly string[] {
  const held = uncommittedIn(root, pagePath)?.[UNBOUND]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function beatAt(root: string, pagePath: string): string | null {
  return beatOn(uncommittedIn(root, pagePath))
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
      worksWithinMs: windowMsIn(one.service.worksWithinSeconds),
      workedAt: beatAt(root, one.pagePath),
      told: one.service.told ?? true,
    })
  }
  return found
}

export function stampIn(said: string | undefined): string | null {
  if (said === undefined || !said.startsWith("@")) return null
  const seconds = Number(said.slice(1))
  return Number.isFinite(seconds) ? new Date(seconds * A_SECOND).toISOString() : null
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
    held.set(id, {
      activeState: said.get(ACTIVE_STATE) ?? "",
      result: said.get(RESULT) ?? "",
      changedAt: stampIn(said.get(STATE_CHANGE)),
    })
  }
  return held
}

export function runningNow(state: UnitState | undefined): boolean {
  return state !== undefined && RUNNING.has(state.activeState)
}

function unbeatenIn(one: Watched, now: Date): string | null {
  const withinMs = one.worksWithinMs
  if (withinMs === null) return null
  const said = beating(one.workedAt, now, withinMs)
  const may = `the ${Math.round(withinMs / A_SECOND)}s it may go`
  if (said.beat === "none") return `${one.unit} has said no round of its work landed, ever`
  if (said.beat === "unreadable") {
    return `${one.unit} says its work landed at \`${said.at}\`, which is no moment`
  }
  if (said.beat === "behind") {
    return `${one.unit} last said its work landed ${said.at}, longer ago than ${may}`
  }
  return null
}

export function settling(changedAt: string | null, now: Date): boolean {
  if (changedAt === null) return false
  const at = Date.parse(changedAt)
  if (!Number.isFinite(at)) return false
  return now.getTime() - at < SETTLE_MS
}

function endedIn(one: Watched, said: string, state: UnitState): string {
  const at = state.changedAt === null ? "" : ` at ${state.changedAt}`
  return `${one.unit} ${said}${at}, and systemd says \`${state.result}\``
}

function endedBadly(state: UnitState): boolean {
  return state.result !== "" && state.result !== SUCCESS
}

export function brokenIn(
  one: Watched,
  state: UnitState | undefined,
  now: Date = new Date()
): string | null {
  if (state === undefined) return `${one.unit} is no unit systemd knows`
  if (state.activeState === "failed") return endedIn(one, "failed", state)
  if (endedBadly(state)) return endedIn(one, "last ended badly", state)
  if (one.unbound.length > 0) {
    return `${one.unit} is not listening at ${one.unbound.join(", ")}, which its page states`
  }
  const unbeaten = unbeatenIn(one, now)
  if (unbeaten !== null) return unbeaten
  if (one.scheduled) return null
  if (runningNow(state)) return null
  if (settling(state.changedAt, now)) return null
  const since = state.changedAt === null ? "" : `, and has been since ${state.changedAt}`
  return `${one.unit} is \`${state.activeState}\` rather than running${since}`
}

export function healthIn(
  watched: readonly Watched[],
  states: ReadonlyMap<string, UnitState>,
  now: Date = new Date()
): readonly Health[] {
  return watched.map((one) => ({
    slug: one.slug,
    unit: one.unit,
    pagePath: one.pagePath,
    broken: brokenIn(one, states.get(one.unit), now),
    told: one.told,
  }))
}

function showing(units: readonly string[]): string {
  if (units.length === 0) return ""
  const asked = [ID, ACTIVE_STATE, RESULT, STATE_CHANGE].join(",")
  return ran(["systemctl", "--user", UNIX_STAMP, "show", ...units, "-p", asked]).out
}

export function stateFor(
  unit: string,
  show: (units: readonly string[]) => string = showing
): UnitState | undefined {
  return statesIn(show([unit])).get(unit)
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
