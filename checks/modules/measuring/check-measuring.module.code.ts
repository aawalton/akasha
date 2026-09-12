import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { speltIn } from "akasha/code/rule/code-rule.module.code.ts"
import { columnsOf } from "akasha/commands/pages/measure/checkout-counting/checkout-counting.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { uncommittedPartsOf } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import { everyOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CHECKED = "code-check"

const ENTRIES = "entries"

const LOGS = "logs"

const HELD = "jsonl"

const CHECK = "check"

const AUDIT = "audit"

const ABSENT = "-"

const TOTAL = "total"

const LAST = "--last"

const COUNTED = /^\d+$/

const PERIODED = /^(\d+)([mhd])$/

const MINUTE_MS = 60000

const HOUR_MS = 3600000

const DAY_MS = 86400000

const FORMS = `\`${LAST} <count>\` names runs and \`${LAST} <count>{m|h|d}\` names a period`

const HEADED: readonly string[] = ["runs", "cpu", "mem", "paths", "refusals"]

const UNREAD = "these were not read, and count no runs:"

const KIB = 1024

const MIB = 1024 * 1024

const GIB = 1024 * 1024 * 1024

export interface Run {
  readonly runId: string | null
  readonly phase: string
  readonly ran: string
  readonly ranAt: number
  readonly cpu: number
  readonly mem: number | null
  readonly paths: number
  readonly refusals: number
}

export interface Held {
  readonly check: string
  readonly runs: readonly Run[]
}

export interface Reading {
  readonly held: readonly Held[]
  readonly unread: readonly string[]
}

export type Chosen =
  | { readonly by: "runs"; readonly runs: number }
  | { readonly by: "period"; readonly ms: number; readonly said: string }

export type Group = typeof CHECK | typeof AUDIT

export interface Chose {
  readonly chosen: Chosen | null
  readonly refusals: readonly string[]
}

export interface CheckCost {
  readonly check: string
  readonly runs: number
  readonly cpu: number | null
  readonly mem: number | null
  readonly paths: number
  readonly refusals: number
}

export interface Total {
  readonly runs: number
  readonly cpu: number | null
  readonly paths: number
  readonly refusals: number
}

export interface Costs {
  readonly checks: readonly CheckCost[]
  readonly total: Total
  readonly unread: readonly string[]
}

export const ONE_RUN: Chosen = { by: "runs", runs: 1 }

export function meanOf(found: readonly number[]): number | null {
  if (found.length === 0) return null
  return found.reduce((total, one) => total + one, 0) / found.length
}

export function rowsIn(body: string): readonly string[] {
  return body.split("\n").filter((one) => one.trim() !== "")
}

export function runIn(row: string): Run {
  const one = JSON.parse(row) as Record<string, unknown>
  const said = one["runId"]
  return {
    runId: typeof said === "string" && said !== "" ? said : null,
    phase: String(one["phase"] ?? ""),
    ran: String(one["ran"] ?? ""),
    ranAt: Date.parse(String(one["ranAt"] ?? "")),
    cpu: Number(one["cpuSeconds"] ?? 0) + Number(one["childCpuSeconds"] ?? 0),
    mem: one["peakMeasured"] === true ? Number(one["peakAddedBytes"] ?? 0) : null,
    paths: Number(one["pathsChanged"] ?? 0),
    refusals: Number(one["refusals"] ?? 0),
  }
}

export function runsIn(body: string): readonly Run[] {
  return rowsIn(body).map(runIn)
}

function spanOf(unit: string): number | null {
  if (unit === "m") return MINUTE_MS
  if (unit === "h") return HOUR_MS
  if (unit === "d") return DAY_MS
  return null
}

function refusing(why: string): Chose {
  return { chosen: null, refusals: [`${why}: ${FORMS}`] }
}

function periodIn(said: string): Chose {
  const found = PERIODED.exec(said)
  const span = found === null ? null : spanOf(found[2] ?? "")
  if (found === null || span === null) {
    return refusing(`\`${said}\` is neither a count of runs nor a period`)
  }
  const ms = Number(found[1] ?? "0") * span
  if (ms === 0) return refusing(`\`${LAST} ${said}\` names a period of no length`)
  return { chosen: { by: "period", ms, said }, refusals: [] }
}

export function windowOf(said: string | undefined): Chose {
  if (said === undefined) return { chosen: ONE_RUN, refusals: [] }
  if (!COUNTED.test(said)) return periodIn(said)
  const runs = Number(said)
  if (runs === 0) return refusing(`\`${LAST} ${said}\` names no run`)
  return { chosen: { by: "runs", runs }, refusals: [] }
}

export function withinOf(runs: readonly Run[], now: number, ms: number): readonly Run[] {
  return runs.filter((one) => one.ranAt >= now - ms && one.ranAt <= now)
}

export function latestOf(runs: readonly Run[]): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of runs) {
    if (one.runId === null || Number.isNaN(one.ranAt)) continue
    const was = found.get(one.runId)
    if (was === undefined || one.ranAt > was) found.set(one.runId, one.ranAt)
  }
  return found
}

export function rankedOf(latest: ReadonlyMap<string, number>, count: number): ReadonlySet<string> {
  const ranked = [...latest].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  return new Set(ranked.slice(0, count).map(([id]) => id))
}

export function runningOf(runs: readonly Run[], ids: ReadonlySet<string>): readonly Run[] {
  return runs.filter((one) => one.runId !== null && ids.has(one.runId))
}

export function underRan(runs: readonly Run[]): ReadonlyMap<string, readonly Run[]> {
  const found = new Map<string, Run[]>()
  for (const one of runs) {
    const had = found.get(one.ran)
    if (had === undefined) found.set(one.ran, [one])
    else had.push(one)
  }
  return found
}

function memoryOf(some: readonly Run[]): readonly number[] {
  return some.flatMap((one) => (one.mem === null ? [] : [one.mem]))
}

function addedOf(runs: readonly Run[], what: (one: Run) => number): number {
  return runs.reduce((total, one) => total + what(one), 0)
}

function pathsOf(runs: readonly Run[]): number {
  const byRun = new Map<string, number>()
  let loose = 0
  for (const one of runs) {
    if (one.runId === null) loose += one.paths
    else byRun.set(one.runId, one.paths)
  }
  return [...byRun.values()].reduce((total, one) => total + one, loose)
}

export function costOf(check: string, runs: readonly Run[]): CheckCost {
  return {
    check,
    runs: runs.length,
    cpu: meanOf(runs.map((one) => one.cpu)),
    mem: meanOf(memoryOf(runs)),
    paths: addedOf(runs, (one) => one.paths),
    refusals: addedOf(runs, (one) => one.refusals),
  }
}

export function totalOf(runs: readonly Run[]): Total {
  const paths = pathsOf(runs)
  const refusals = addedOf(runs, (one) => one.refusals)
  const count = latestOf(runs).size
  if (count === 0) return { runs: 0, cpu: null, paths, refusals }
  return {
    runs: count,
    cpu: addedOf(runs, (one) => one.cpu) / count,
    paths,
    refusals,
  }
}

export function byCpu(a: CheckCost, b: CheckCost): number {
  if (a.cpu === null && b.cpu === null) return a.check.localeCompare(b.check)
  if (a.cpu === null) return 1
  if (b.cpu === null) return -1
  return b.cpu - a.cpu || a.check.localeCompare(b.check)
}

export function partsIn(root: string, page: string, under: string): readonly string[] {
  const there = (at: string): boolean => existsSync(join(root, at))
  return uncommittedPartsOf(page, under, HELD, there).filter(there)
}

export function groupOf(phase: string): Group {
  return phase === AUDIT ? AUDIT : CHECK
}

export function logsOf(group: Group): string {
  return `${group}.${LOGS}`
}

interface Gathering {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly read: boolean
}

function readInto(
  root: string,
  page: string,
  under: string,
  keeping: (one: Run) => boolean,
  held: Set<string>
): Gathering {
  const runs: Run[] = []
  const unread: string[] = []
  let read = false
  for (const at of partsIn(root, page, under)) {
    try {
      const rows = rowsIn(readFileSync(join(root, at), "utf8")).filter((one) => !held.has(one))
      const found = rows.map(runIn)
      for (const one of rows) held.add(one)
      for (const one of found) {
        if (keeping(one)) runs.push(one)
      }
      read = true
    } catch {
      unread.push(at)
    }
  }
  return { runs, unread, read }
}

function gatheredIn(root: string, page: string, group: Group): Gathering {
  const held = new Set<string>()
  const logs = readInto(root, page, logsOf(group), () => true, held)
  const was = readInto(root, page, ENTRIES, (one) => groupOf(one.phase) === group, held)
  return {
    runs: [...logs.runs, ...was.runs],
    unread: [...logs.unread, ...was.unread],
    read: logs.read || was.read,
  }
}

export function heldIn(root: string, group: Group = CHECK): Reading {
  const held: Held[] = []
  const unread: string[] = []
  for (const page of everyOfType(root, CHECKED)) {
    const named = partedIn(page.path)
    if (named === null) continue
    const found = gatheredIn(root, page.path, group)
    unread.push(...found.unread)
    if (found.read) held.push({ check: named.slug, runs: found.runs })
  }
  return { held, unread }
}

export function costsIn(root: string, now: number, chosen: Chosen, group: Group = CHECK): Costs {
  const reading = heldIn(root, group)
  const every = reading.held.flatMap((one) => one.runs)
  const ids = rankedOf(latestOf(every), chosen.by === "runs" ? chosen.runs : 0)
  const checks: CheckCost[] = []
  const picked: Run[] = []
  for (const one of reading.held) {
    const runs =
      chosen.by === "period" ? withinOf(one.runs, now, chosen.ms) : runningOf(one.runs, ids)
    for (const run of runs) picked.push(run)
    if (runs.length > 0) checks.push(costOf(one.check, runs))
  }
  return { checks: [...checks].sort(byCpu), total: totalOf(picked), unread: reading.unread }
}

export function bytesAs(count: number): string {
  const whole = Math.round(count)
  if (whole >= GIB) return `${(whole / GIB).toFixed(1)} GiB`
  if (whole >= MIB) return `${(whole / MIB).toFixed(1)} MiB`
  if (whole >= KIB) return `${(whole / KIB).toFixed(1)} KiB`
  return `${whole} B`
}

export function secondsAs(count: number): string {
  return `${count.toFixed(3)}s`
}

function rowOf(one: CheckCost): readonly string[] {
  return [
    one.check,
    String(one.runs),
    one.cpu === null ? ABSENT : secondsAs(one.cpu),
    one.mem === null ? ABSENT : bytesAs(one.mem),
    String(one.paths),
    String(one.refusals),
  ]
}

function totalRowOf(total: Total): readonly string[] {
  return [
    TOTAL,
    String(total.runs),
    total.cpu === null ? ABSENT : secondsAs(total.cpu),
    ABSENT,
    String(total.paths),
    String(total.refusals),
  ]
}

export function linesOf(costs: Costs, named: string = CHECK): readonly string[] {
  const rows: readonly (readonly string[])[] = [
    [named, ...HEADED],
    ...costs.checks.map(rowOf),
    [],
    totalRowOf(costs.total),
  ]
  const said = [...columnsOf(rows)]
  if (costs.unread.length > 0) said.push("", UNREAD, ...costs.unread)
  return said
}

export interface Ruled {
  readonly path: string
  readonly name: string
  readonly rule: string
}

export interface Tally {
  readonly at: string
  readonly refused: number
  readonly within: number
  readonly outward: number
  readonly files: number
}

function filesOf(ruled: readonly Ruled[]): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, Set<string>>()
  for (const one of ruled) {
    const had = found.get(one.rule)
    if (had === undefined) found.set(one.rule, new Set([one.path]))
    else had.add(one.path)
  }
  return found
}

export function ruledIn(root: string, paths: readonly string[]): readonly Ruled[] {
  const found: Ruled[] = []
  for (const at of paths) {
    let text = ""
    try {
      text = readFileSync(join(root, at), "utf8")
    } catch {
      continue
    }
    for (const one of speltIn(at, text)) {
      if (!one.forwards) found.push({ path: at, name: one.name, rule: one.rule })
    }
  }
  return found
}

export function sharedIn(ruled: readonly Ruled[]): readonly Ruled[] {
  const files = filesOf(ruled)
  return ruled.filter((one) => (files.get(one.rule)?.size ?? 0) > 1)
}

export function tallyOf(ruled: readonly Ruled[], at: string, under: string): Tally {
  const files = filesOf(ruled)
  const shared = sharedIn(ruled)
  const within = shared.filter((one) => one.path.startsWith(under))
  const outward = within.filter((one) =>
    [...(files.get(one.rule) ?? [])].some((each) => !each.startsWith(under))
  )
  return {
    at,
    refused: shared.length,
    within: within.length,
    outward: outward.length,
    files: new Set(within.map((one) => one.path)).size,
  }
}

export function tallyLinesOf(tally: Tally, under: string): readonly string[] {
  return [
    `${tally.at} is the commit this was taken at`,
    `${tally.refused} bodies share a rule with another file across the tree`,
    `${tally.within} of those are under ${under}`,
    `${tally.outward} of those pair with a file outside ${under}`,
    `${tally.files} distinct files under ${under}`,
  ]
}
