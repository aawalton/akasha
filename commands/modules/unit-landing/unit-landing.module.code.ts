import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  type Linking,
  NOTHING_LINKED,
} from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import {
  pinnedTree,
  saidOfNoTree,
  treeIn,
} from "akasha/commands/pages/deploy/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  ourInstalled,
  stagingDir,
  systemctl,
  textFor,
  writeUnit,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  everyService,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import {
  asked,
  type Running,
  type Starting,
  startedOver,
} from "akasha/infrastructure/services/workstations/service-restarting/service-restarting.module.code.ts"
import { isScheduled } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const A_TIMER = ".timer"

const A_COMMENT = "#"

const A_SECTION = "["

const HELD_BY = "="

const A_UNIT = "unit"

const RELOAD: readonly string[] = ["daemon-reload"]

const RUNS_UNDER: readonly string[] = ["ExecStart", "Environment", "WorkingDirectory"]

const ARMED_BY: readonly string[] = [
  "OnCalendar",
  "RandomizedDelaySec",
  "AccuracySec",
  "Persistent",
]

export type Drift = {
  readonly unit: string
  readonly page: string
  readonly text: string
  readonly startsFor: readonly string[]
}

export type Weighing = {
  readonly drifts: readonly Drift[]
  readonly under: string
  readonly wrong: readonly string[]
}

const NOTHING_WEIGHED: Weighing = { drifts: [], under: "", wrong: [] }

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

export function treeLanded(root: string, commit: string | null): Linking {
  if (commit === null) return NOTHING_LINKED
  try {
    const pinned = pinnedTree(root, SERVICE_PAGE_TYPE, commit)
    if ("refused" in pinned) return { said: [], wrong: [pinned.refused] }
    return { said: [`moved the \`${SERVICE_PAGE_TYPE}\` tree to ${commit}`], wrong: [] }
  } catch (thrown) {
    const why = `the tree would not move to ${commit} — ${whyOf(thrown)}`
    return { said: [], wrong: [saidOfNoTree(SERVICE_PAGE_TYPE, why)] }
  }
}

export function weighedIn(root: string, home: string): Weighing {
  const owned = new Set(ourInstalled(home))
  if (owned.size === 0) return NOTHING_WEIGHED
  const under = treeInstalled(home, [...owned], treeIn(root, SERVICE_PAGE_TYPE))
  const read = everyService(root, under)
  if ("refused" in read) {
    return { ...NOTHING_WEIGHED, wrong: [`no workstation unit was weighed — ${read.refused}`] }
  }
  const drifts: Drift[] = []
  for (const one of read.services) {
    const enabled = one.service.enabled
    const scheduled = isScheduled(one)
    for (const [unit, text] of textFor(one)) {
      if (!owned.has(unit)) continue
      const was = installedText(home, unit)
      if (was === text) continue
      drifts.push({
        unit,
        page: one.pagePath,
        text,
        startsFor: startsAgainFor(unit, was, text, enabled, scheduled),
      })
    }
  }
  return { drifts, under, wrong: [] }
}

export function stilled(weighed: Weighing): Weighing {
  return { ...weighed, drifts: weighed.drifts.map((one) => ({ ...one, startsFor: [] })) }
}

export function startingIn(written: readonly Drift[]): readonly Starting[] {
  return written
    .filter((one) => one.startsFor.length > 0)
    .map((one) => ({ unit: one.unit, why: `${namesDrawn(one.startsFor)} changed` }))
    .sort((one, two) => (one.unit < two.unit ? -1 : one.unit > two.unit ? 1 : 0))
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
  const starting = startingIn(written)
  if (written.length > 0) {
    const many = counted(written.length, A_UNIT)
    const reload = asked(run, RELOAD)
    if (reload.code !== 0) {
      wrong.push(
        `systemd was not told to read ${many} again, so what is loaded is what was loaded — ${reload.out}`
      )
      return { said, wrong }
    }
    said.push(`told systemd to read ${many} again`)
  }
  const done = startedOver(run, starting)
  return { said: [...said, ...done.said], wrong: [...wrong, ...done.wrong] }
}

export function unitsLanded(
  root: string,
  home: string,
  commit: string | null = null,
  run: Running = systemctl
): Linking {
  const tree = treeLanded(root, commit)
  try {
    const weighed = weighedIn(root, home)
    const stale = tree.wrong.length > 0 && weighed.under !== ""
    const held = stale
      ? `no service was started again, because the services run out of ${weighed.under} and that tree is not at the commit`
      : null
    const done = landedOver(stale ? stilled(weighed) : weighed, home, run)
    return {
      said: [...tree.said, ...done.said],
      wrong: [...tree.wrong, ...(held === null ? [] : [held]), ...done.wrong],
    }
  } catch (thrown) {
    return {
      said: [...tree.said],
      wrong: [
        ...tree.wrong,
        `no workstation unit was kept as its page states it — ${whyOf(thrown)}`,
      ],
    }
  }
}
