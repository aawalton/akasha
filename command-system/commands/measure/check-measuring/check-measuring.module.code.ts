import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { columnsOf } from "../checkout-counting/checkout-counting.module.code.ts"

const PAGES_AT = "checks/code-checks/pages"

const ENTRIES_NAMED = /\.code-check\.entries\.uncommitted\.jsonl$/

const PATCH = "patch"

const AUDIT = "audit"

const ABSENT = "-"

const TOTAL = "total"

const LAST = "--last"

const AUDIT_FLAG = "--audit"

const COUNTED = /^\d+$/

const PERIODED = /^(\d+)([mhd])$/

const MINUTE_MS = 60000

const HOUR_MS = 3600000

const DAY_MS = 86400000

const FORMS =
  `\`${LAST} <count>\` names runs, \`${LAST} <count>{m|h|d}\` names a period, ` +
  `and \`${AUDIT_FLAG}\` reads the audit runs`

const HEADING: readonly string[] = ["check", "runs", "cpu", "mem"]

const UNREAD = "these were not read, and count no runs:"

const OTHER = "these runs name a phase this does not read:"

const KIB = 1024

const MIB = 1024 * 1024

const GIB = 1024 * 1024 * 1024

export interface Run {
  readonly runId: string | null
  readonly phase: string
  readonly ranAt: number
  readonly cpu: number
  readonly mem: number | null
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

export interface Chose {
  readonly chosen: Chosen | null
  readonly refusals: readonly string[]
}

export interface CheckCost {
  readonly check: string
  readonly patchRuns: number
  readonly patchCpu: number | null
  readonly patchMem: number | null
  readonly auditRuns: number
  readonly auditCpu: number | null
  readonly auditMem: number | null
}

export interface Total {
  readonly patchRuns: number
  readonly patchCpu: number | null
  readonly auditRuns: number
  readonly auditCpu: number | null
}

export interface Costs {
  readonly checks: readonly CheckCost[]
  readonly total: Total
  readonly unread: readonly string[]
  readonly other: readonly string[]
}

export const ONE_RUN: Chosen = { by: "runs", runs: 1 }

export function meanOf(found: readonly number[]): number | null {
  if (found.length === 0) return null
  return found.reduce((total, one) => total + one, 0) / found.length
}

export function runsIn(body: string): readonly Run[] {
  const found: Run[] = []
  for (const line of body.split("\n")) {
    if (line.trim() === "") continue
    const one = JSON.parse(line) as Record<string, unknown>
    const said = one["runId"]
    found.push({
      runId: typeof said === "string" && said !== "" ? said : null,
      phase: String(one["phase"] ?? ""),
      ranAt: Date.parse(String(one["ranAt"] ?? "")),
      cpu: Number(one["cpuSeconds"] ?? 0) + Number(one["childCpuSeconds"] ?? 0),
      mem: one["peakMeasured"] === true ? Number(one["peakAddedBytes"] ?? 0) : null,
    })
  }
  return found
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

export function chosenIn(argv: readonly string[]): Chose {
  if (argv.length === 0) return { chosen: ONE_RUN, refusals: [] }
  const first = argv[0] ?? ""
  if (first !== LAST) return refusing(`\`${first}\` is no argument this command takes`)
  if (argv.length === 1) return refusing(`\`${LAST}\` was handed nothing to read`)
  if (argv.length > 2)
    return refusing(`\`${LAST}\` takes one word and ${argv.length - 1} follow it`)
  const said = argv[1] ?? ""
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

function memoryOf(some: readonly Run[]): readonly number[] {
  return some.flatMap((one) => (one.mem === null ? [] : [one.mem]))
}

export function costOf(check: string, runs: readonly Run[]): CheckCost {
  const patch = runs.filter((one) => one.phase === PATCH)
  const audit = runs.filter((one) => one.phase === AUDIT)
  return {
    check,
    patchRuns: patch.length,
    patchCpu: meanOf(patch.map((one) => one.cpu)),
    patchMem: meanOf(memoryOf(patch)),
    auditRuns: audit.length,
    auditCpu: meanOf(audit.map((one) => one.cpu)),
    auditMem: meanOf(memoryOf(audit)),
  }
}

function perRunOf(runs: readonly Run[], phase: string): number | null {
  const some = runs.filter((one) => one.phase === phase)
  const count = latestOf(some).size
  if (count === 0) return null
  return some.reduce((total, one) => total + one.cpu, 0) / count
}

export function totalOf(runs: readonly Run[]): Total {
  return {
    patchRuns: latestOf(runs.filter((one) => one.phase === PATCH)).size,
    patchCpu: perRunOf(runs, PATCH),
    auditRuns: latestOf(runs.filter((one) => one.phase === AUDIT)).size,
    auditCpu: perRunOf(runs, AUDIT),
  }
}

export function byPatchCpu(a: CheckCost, b: CheckCost): number {
  if (a.patchCpu === null && b.patchCpu === null) return a.check.localeCompare(b.check)
  if (a.patchCpu === null) return 1
  if (b.patchCpu === null) return -1
  return b.patchCpu - a.patchCpu || a.check.localeCompare(b.check)
}

function namedIn(root: string, folder: string): string | undefined {
  try {
    return readdirSync(join(root, PAGES_AT, folder)).find((one) => ENTRIES_NAMED.test(one))
  } catch {
    return undefined
  }
}

export function heldIn(root: string): Reading {
  let folders: readonly string[]
  try {
    folders = readdirSync(join(root, PAGES_AT))
  } catch {
    return { held: [], unread: [] }
  }
  const held: Held[] = []
  const unread: string[] = []
  for (const folder of [...folders].sort()) {
    const name = namedIn(root, folder)
    if (name === undefined) continue
    const path = join(PAGES_AT, folder, name)
    try {
      held.push({ check: folder, runs: runsIn(readFileSync(join(root, path), "utf8")) })
    } catch {
      unread.push(path)
    }
  }
  return { held, unread }
}

export function costsIn(root: string, now: number, chosen: Chosen): Costs {
  const reading = heldIn(root)
  const every = reading.held.flatMap((one) => one.runs)
  const ids = rankedOf(latestOf(every), chosen.by === "runs" ? chosen.runs : 0)
  const checks: CheckCost[] = []
  const picked: Run[] = []
  const other = new Map<string, number>()
  for (const one of reading.held) {
    const runs =
      chosen.by === "period" ? withinOf(one.runs, now, chosen.ms) : runningOf(one.runs, ids)
    for (const run of runs) {
      picked.push(run)
      if (run.phase === PATCH || run.phase === AUDIT) continue
      other.set(run.phase, (other.get(run.phase) ?? 0) + 1)
    }
    if (runs.length > 0) checks.push(costOf(one.check, runs))
  }
  return {
    checks: [...checks].sort(byPatchCpu),
    total: totalOf(picked),
    unread: reading.unread,
    other: [...other].map(([phase, count]) => `${phase}: ${count}`),
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

function rowOf(one: CheckCost): readonly string[] {
  return [
    one.check,
    String(one.patchRuns),
    one.patchCpu === null ? ABSENT : secondsAs(one.patchCpu),
    one.patchMem === null ? ABSENT : bytesAs(one.patchMem),
    String(one.auditRuns),
    one.auditCpu === null ? ABSENT : secondsAs(one.auditCpu),
    one.auditMem === null ? ABSENT : bytesAs(one.auditMem),
  ]
}

function totalRowOf(total: Total): readonly string[] {
  return [
    TOTAL,
    String(total.patchRuns),
    total.patchCpu === null ? ABSENT : secondsAs(total.patchCpu),
    ABSENT,
    String(total.auditRuns),
    total.auditCpu === null ? ABSENT : secondsAs(total.auditCpu),
    ABSENT,
  ]
}

export function linesOf(costs: Costs): readonly string[] {
  const rows: readonly (readonly string[])[] = [
    HEADING,
    ...costs.checks.map(rowOf),
    [],
    totalRowOf(costs.total),
  ]
  const said = [...columnsOf(rows)]
  if (costs.other.length > 0) said.push("", OTHER, ...costs.other)
  if (costs.unread.length > 0) said.push("", UNREAD, ...costs.unread)
  return said
}
