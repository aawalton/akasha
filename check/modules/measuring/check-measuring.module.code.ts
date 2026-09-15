import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { columnsOf } from "akasha/command/pages/measure/modules/checkout-counting/checkout-counting.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedPartsOf } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"

const CHECKED = "check-code"

const ENTRIES = "entries"

const LOGS = "logs"

const HELD = "jsonl"

const CHECK = "check"

const AUDIT = "audit"

const ABSENT = "-"

const TOTAL = "total"

const LAST = "--last"

const NONE_SAID = "24h"

const COUNTED = /^\d+$/

const PERIODED = /^(\d+)([mhd])$/

const MINUTE_MS = 60000

const HOUR_MS = 3600000

const DAY_MS = 86400000

const FORMS = `\`${LAST} <count>\` names runs and \`${LAST} <count>{m|h|d}\` names a period`

const HEADED: readonly string[] = [
  "runs",
  "cpu avg",
  "wall avg",
  "mem avg",
  "cpu max",
  "wall max",
  "mem max",
]

const UNREAD = "these were not read, and count no runs:"

const TORN = "these held a row that would not read, and that row counts no run:"

const KIB = 1024

const MIB = 1024 * 1024

const GIB = 1024 * 1024 * 1024

const A_THOUSAND = 1000

export interface Run {
  readonly runId: string | null
  readonly phase: string
  readonly ran: string
  readonly ranAt: number
  readonly cpu: number
  readonly wall: number
  readonly mem: number | null
}

export interface Held {
  readonly check: string
  readonly runs: readonly Run[]
}

export interface Reading {
  readonly held: readonly Held[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
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
  readonly cpuMost: number | null
  readonly wall: number | null
  readonly wallMost: number | null
  readonly mem: number | null
  readonly memMost: number | null
}

export interface Total {
  readonly runs: number
  readonly cpu: number | null
  readonly cpuMost: number | null
  readonly wall: number | null
  readonly wallMost: number | null
  readonly memMost: number | null
}

export interface Costs {
  readonly checks: readonly CheckCost[]
  readonly total: Total
  readonly unread: readonly string[]
  readonly torn: readonly string[]
}

export function meanOf(found: readonly number[]): number | null {
  if (found.length === 0) return null
  return found.reduce((total, one) => total + one, 0) / found.length
}

export function mostOf(found: readonly number[]): number | null {
  let most: number | null = null
  for (const one of found) {
    if (most === null || one > most) most = one
  }
  return most
}

function rowsIn(body: string): readonly string[] {
  return body.split("\n").filter((one) => one.trim() !== "")
}

function runIn(row: string): Run {
  const one = JSON.parse(row) as Record<string, unknown>
  const said = one["runId"]
  return {
    runId: typeof said === "string" && said !== "" ? said : null,
    phase: String(one["phase"] ?? ""),
    ran: String(one["ran"] ?? ""),
    ranAt: Date.parse(String(one["ranAt"] ?? "")),
    cpu: Number(one["cpuSeconds"] ?? 0) + Number(one["childCpuSeconds"] ?? 0),
    wall: Number(one["wallMs"] ?? 0) / A_THOUSAND,
    mem: one["peakMeasured"] === true ? Number(one["peakAddedBytes"] ?? 0) : null,
  }
}

export interface Rows {
  readonly runs: readonly Run[]
  readonly torn: number
}

function rowsRead(rows: readonly string[]): Rows {
  const runs: Run[] = []
  let torn = 0
  for (const one of rows) {
    try {
      runs.push(runIn(one))
    } catch {
      torn += 1
    }
  }
  return { runs, torn }
}

export function runsRead(body: string): Rows {
  return rowsRead(rowsIn(body))
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
  if (said === undefined) return periodIn(NONE_SAID)
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

export function costOf(check: string, runs: readonly Run[]): CheckCost {
  const cpu = runs.map((one) => one.cpu)
  const wall = runs.map((one) => one.wall)
  const mem = memoryOf(runs)
  return {
    check,
    runs: runs.length,
    cpu: meanOf(cpu),
    cpuMost: mostOf(cpu),
    wall: meanOf(wall),
    wallMost: mostOf(wall),
    mem: meanOf(mem),
    memMost: mostOf(mem),
  }
}

function wholeRuns(runs: readonly Run[], what: (one: Run) => number): readonly number[] {
  const found = new Map<string, number>()
  const loose: number[] = []
  for (const one of runs) {
    if (one.runId === null) loose.push(what(one))
    else found.set(one.runId, (found.get(one.runId) ?? 0) + what(one))
  }
  return [...found.values(), ...loose]
}

export function totalOf(runs: readonly Run[]): Total {
  const count = latestOf(runs).size
  const shared = (what: (one: Run) => number): number | null =>
    count === 0 ? null : addedOf(runs, what) / count
  return {
    runs: count,
    cpu: shared((one) => one.cpu),
    cpuMost: mostOf(wholeRuns(runs, (one) => one.cpu)),
    wall: shared((one) => one.wall),
    wallMost: mostOf(wholeRuns(runs, (one) => one.wall)),
    memMost: mostOf(memoryOf(runs)),
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

function groupOf(phase: string): Group {
  return phase === AUDIT ? AUDIT : CHECK
}

function logsOf(group: Group): string {
  return `${group}.${LOGS}`
}

interface Gathering {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
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
  const torn: string[] = []
  let read = false
  for (const at of partsIn(root, page, under)) {
    let body: string
    try {
      body = readFileSync(join(root, at), "utf8")
    } catch {
      unread.push(at)
      continue
    }
    const rows = rowsIn(body).filter((one) => !held.has(one))
    for (const one of rows) held.add(one)
    const found = rowsRead(rows)
    for (const one of found.runs) {
      if (keeping(one)) runs.push(one)
    }
    if (found.torn > 0) torn.push(at)
    read = true
  }
  return { runs, unread, torn, read }
}

function gatheredIn(root: string, page: string, group: Group): Gathering {
  const held = new Set<string>()
  const logs = readInto(root, page, logsOf(group), () => true, held)
  const was = readInto(root, page, ENTRIES, (one) => groupOf(one.phase) === group, held)
  return {
    runs: [...logs.runs, ...was.runs],
    unread: [...logs.unread, ...was.unread],
    torn: [...logs.torn, ...was.torn],
    read: logs.read || was.read,
  }
}

export function heldIn(root: string, group: Group = CHECK): Reading {
  const held: Held[] = []
  const unread: string[] = []
  const torn: string[] = []
  for (const page of everyOfType(root, CHECKED)) {
    const named = partedIn(page.path)
    if (named === null) continue
    const found = gatheredIn(root, page.path, group)
    unread.push(...found.unread)
    torn.push(...found.torn)
    if (found.read) held.push({ check: named.slug, runs: found.runs })
  }
  return { held, unread, torn }
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
  return {
    checks: [...checks].sort(byCpu),
    total: totalOf(picked),
    unread: reading.unread,
    torn: reading.torn,
  }
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

function saidAs(count: number | null, how: (found: number) => string): string {
  return count === null ? ABSENT : how(count)
}

function rowOf(one: CheckCost): readonly string[] {
  return [
    one.check,
    String(one.runs),
    saidAs(one.cpu, secondsAs),
    saidAs(one.wall, secondsAs),
    saidAs(one.mem, bytesAs),
    saidAs(one.cpuMost, secondsAs),
    saidAs(one.wallMost, secondsAs),
    saidAs(one.memMost, bytesAs),
  ]
}

function totalRowOf(total: Total): readonly string[] {
  return [
    TOTAL,
    String(total.runs),
    saidAs(total.cpu, secondsAs),
    saidAs(total.wall, secondsAs),
    ABSENT,
    saidAs(total.cpuMost, secondsAs),
    saidAs(total.wallMost, secondsAs),
    saidAs(total.memMost, bytesAs),
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
  if (costs.torn.length > 0) said.push("", TORN, ...costs.torn)
  return said
}
