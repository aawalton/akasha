import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Linking } from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { treeIn } from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  ourInstalled,
  type Ran,
  stagingDir,
  systemctl,
  textFor,
  writeUnit,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  everyService,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { isScheduled } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"
import { NO_CODE } from "akasha/utils/run/running/running.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const A_TIMER = ".timer"

const A_COMMENT = "#"

const A_SECTION = "["

const HELD_BY = "="

const A_UNIT = "unit"

const RELOAD: readonly string[] = ["daemon-reload"]

const RESTART = "restart"

const RUNS_UNDER: readonly string[] = ["ExecStart", "Environment", "WorkingDirectory"]

const ARMED_BY: readonly string[] = [
  "OnCalendar",
  "RandomizedDelaySec",
  "AccuracySec",
  "Persistent",
]

const PUT_RIGHT = "`akasha deploy service-workstation` puts it right"

export type Drift = {
  readonly unit: string
  readonly page: string
  readonly text: string
  readonly startsFor: readonly string[]
}

export type Weighing = {
  readonly drifts: readonly Drift[]
  readonly wrong: readonly string[]
}

export type Running = (args: readonly string[]) => Ran

export function fieldsIn(text: string): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, string[]>()
  for (const line of text.split("\n")) {
    const one = line.trim()
    if (one === "" || one.startsWith(A_COMMENT) || one.startsWith(A_SECTION)) continue
    const at = one.indexOf(HELD_BY)
    if (at < 1) continue
    const key = one.slice(0, at)
    const value = one.slice(at + 1)
    const found = held.get(key)
    if (found === undefined) held.set(key, [value])
    else found.push(value)
  }
  return held
}

export function changedAmong(
  was: ReadonlyMap<string, readonly string[]>,
  now: ReadonlyMap<string, readonly string[]>,
  keys: readonly string[]
): readonly string[] {
  return keys.filter((key) => (was.get(key) ?? []).join("\n") !== (now.get(key) ?? []).join("\n"))
}

export function startsAgainFor(
  unit: string,
  was: string | null,
  text: string,
  enabled: boolean,
  scheduled: boolean
): readonly string[] {
  if (!enabled || was === null) return []
  const timer = unit.endsWith(A_TIMER)
  if (scheduled && !timer) return []
  return changedAmong(fieldsIn(was), fieldsIn(text), timer ? ARMED_BY : RUNS_UNDER)
}

export function installedText(home: string, unit: string): string | null {
  const at = join(stagingDir(home), unit)
  if (!existsSync(at)) return null
  try {
    return readFileSync(at, "utf8")
  } catch {
    return null
  }
}

export function treeInstalled(home: string, owned: readonly string[], at: string | null): string {
  if (at === null) return ""
  for (const unit of owned) {
    const was = installedText(home, unit)
    if (was?.includes(at) === true) return at
  }
  return ""
}

export function weighedIn(root: string, home: string): Weighing {
  const owned = new Set(ourInstalled(home))
  if (owned.size === 0) return { drifts: [], wrong: [] }
  const under = treeInstalled(home, [...owned], treeIn(root, SERVICE_PAGE_TYPE))
  const read = everyService(root, under)
  if ("refused" in read) {
    return { drifts: [], wrong: [`no workstation unit was weighed — ${read.refused}`] }
  }
  const drifts: Drift[] = []
  for (const one of read.services) {
    for (const [unit, text] of textFor(one)) {
      if (!owned.has(unit)) continue
      const was = installedText(home, unit)
      if (was === text) continue
      const enabled = one.service.enabled
      drifts.push({
        unit,
        page: one.pagePath,
        text,
        startsFor: startsAgainFor(unit, was, text, enabled, isScheduled(one)),
      })
    }
  }
  return { drifts, wrong: [] }
}

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}

export function landedOver(weighed: Weighing, home: string, run: Running): Linking {
  const said: string[] = []
  const wrong: string[] = [...weighed.wrong]
  const written: Drift[] = []
  for (const one of weighed.drifts) {
    try {
      writeUnit(home, one.unit, one.text)
      written.push(one)
      said.push(`wrote ${one.unit} as ${one.page} states it`)
    } catch (thrown) {
      wrong.push(`${one.unit} drifted from ${one.page} and was not written — ${whyOf(thrown)}`)
    }
  }
  if (written.length === 0) return { said, wrong }
  const many = counted(written.length, A_UNIT)
  const reload = asked(run, RELOAD)
  if (reload.code !== 0) {
    wrong.push(
      `${many} were written and systemd was not told to read them again, so what is loaded is what was loaded — ${reload.out}`
    )
    return { said, wrong }
  }
  said.push(`told systemd to read ${many} again`)
  for (const one of written) {
    if (one.startsFor.length === 0) continue
    const why = `${namesDrawn(one.startsFor)} changed`
    const done = asked(run, [RESTART, one.unit])
    if (done.code !== 0) {
      wrong.push(`${one.unit} runs as it did, and ${why} — ${done.out}; ${PUT_RIGHT}`)
      continue
    }
    said.push(`${one.unit.endsWith(A_TIMER) ? "armed" : "started"} ${one.unit} again — ${why}`)
  }
  return { said, wrong }
}

export function unitsLanded(root: string, home: string, run: Running = systemctl): Linking {
  try {
    return landedOver(weighedIn(root, home), home, run)
  } catch (thrown) {
    return { said: [], wrong: [`no workstation unit was weighed — ${whyOf(thrown)}`] }
  }
}
