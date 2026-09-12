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
  type Ran,
  stagingDir,
  systemctl,
  textFor,
  writeUnit,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  filesRun,
  REACHED_CEILING,
  reachedBack,
  reachingIn,
} from "akasha/infrastructure/services/workstations/service-reaching/service-reaching.module.code.ts"
import {
  everyService,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { isScheduled } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"
import { NO_CODE } from "akasha/utils/run/running/running.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const A_TIMER = ".timer"

const A_SERVICE = ".service"

const A_COMMENT = "#"

const A_SECTION = "["

const HELD_BY = "="

const A_UNIT = "unit"

const RELOAD: readonly string[] = ["daemon-reload"]

const RESTART = "restart"

const AND = " and "

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

export type Standing = {
  readonly unit: string
  readonly page: string
  readonly files: readonly string[]
}

export type Weighing = {
  readonly drifts: readonly Drift[]
  readonly standings: readonly Standing[]
  readonly wrong: readonly string[]
}

export type Reaching = {
  readonly starts: ReadonlyMap<string, string>
  readonly wrong: readonly string[]
}

export type Starting = {
  readonly unit: string
  readonly why: string
}

export type Running = (args: readonly string[]) => Ran

const NOTHING_WEIGHED: Weighing = { drifts: [], standings: [], wrong: [] }

const NOTHING_REACHED: Reaching = { starts: new Map(), wrong: [] }

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
  const standings: Standing[] = []
  for (const one of read.services) {
    const enabled = one.service.enabled
    const scheduled = isScheduled(one)
    const named = `${one.service.slug}${A_SERVICE}`
    if (enabled && !scheduled && owned.has(named)) {
      standings.push({ unit: named, page: one.pagePath, files: filesRun(one.service.runs, under) })
    }
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
  return { drifts, standings, wrong: [] }
}

export function reachedFor(
  root: string,
  standings: readonly Standing[],
  changed: readonly string[]
): Reaching {
  if (standings.length === 0 || changed.length === 0) return NOTHING_REACHED
  try {
    const reached = reachedBack(root, changed)
    const starts = new Map<string, string>()
    for (const one of standings) {
      const at = reachingIn(one.files, reached.files)
      if (at !== null) starts.set(one.unit, at)
    }
    const wrong = reached.stopped
      ? [
          `what the commit changed was followed back through ${REACHED_CEILING} files and no ` +
            `further, so a service reaching past that runs as it did; ${PUT_RIGHT}`,
        ]
      : []
    return { starts, wrong }
  } catch (thrown) {
    return {
      starts: new Map(),
      wrong: [`no service was weighed against what the commit changed — ${whyOf(thrown)}`],
    }
  }
}

export function startingIn(
  written: readonly Drift[],
  starts: ReadonlyMap<string, string>
): readonly Starting[] {
  const held = new Map<string, string[]>()
  for (const one of written) {
    if (one.startsFor.length === 0) continue
    held.set(one.unit, [`${namesDrawn(one.startsFor)} changed`])
  }
  for (const [unit, at] of starts) {
    const why = `the code it runs changed at \`${at}\``
    const found = held.get(unit)
    if (found === undefined) held.set(unit, [why])
    else found.push(why)
  }
  return [...held]
    .map(([unit, why]) => ({ unit, why: why.join(AND) }))
    .sort((one, two) => (one.unit < two.unit ? -1 : one.unit > two.unit ? 1 : 0))
}

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}

export function landedOver(
  weighed: Weighing,
  home: string,
  run: Running,
  starts: ReadonlyMap<string, string> = new Map()
): Linking {
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
  const starting = startingIn(written, starts)
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
  for (const one of starting) {
    const done = asked(run, [RESTART, one.unit])
    if (done.code !== 0) {
      wrong.push(`${one.unit} runs as it did, and ${one.why} — ${done.out}; ${PUT_RIGHT}`)
      continue
    }
    said.push(`${one.unit.endsWith(A_TIMER) ? "armed" : "started"} ${one.unit} again — ${one.why}`)
  }
  return { said, wrong }
}

export function unitsLanded(
  root: string,
  home: string,
  commit: string | null = null,
  changed: readonly string[] = [],
  run: Running = systemctl
): Linking {
  const tree = treeLanded(root, commit)
  try {
    const weighed = weighedIn(root, home)
    const reached = commit === null ? NOTHING_REACHED : reachedFor(root, weighed.standings, changed)
    const done = landedOver(weighed, home, run, reached.starts)
    return {
      said: [...tree.said, ...done.said],
      wrong: [...tree.wrong, ...reached.wrong, ...done.wrong],
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
