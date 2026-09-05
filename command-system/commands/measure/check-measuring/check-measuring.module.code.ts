import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { columnsOf } from "../checkout-counting/checkout-counting.module.code.ts"

const PAGES_AT = "checks/code-checks/pages"

const ENTRIES_NAMED = /\.code-check\.entries\.uncommitted\.jsonl$/

const PATCH = "patch"

const AUDIT = "audit"

const ABSENT = "-"

const HEADING: readonly string[] = ["check", "patch cpu", "patch mem", "full cpu", "full mem"]

const UNREAD = "these were not read, and count no runs:"

const OTHER = "these runs name a phase this does not split by:"

const KIB = 1024

const MIB = 1024 * 1024

const GIB = 1024 * 1024 * 1024

export interface Run {
  readonly phase: string
  readonly cpu: number
  readonly mem: number | null
}

export interface CheckCost {
  readonly check: string
  readonly patchCpu: number | null
  readonly patchMem: number | null
  readonly auditCpu: number | null
  readonly auditMem: number | null
}

export interface Costs {
  readonly checks: readonly CheckCost[]
  readonly unread: readonly string[]
  readonly other: readonly string[]
}

export function medianOf(found: readonly number[]): number | null {
  if (found.length === 0) return null
  const sorted = [...found].sort((a, b) => a - b)
  if (sorted.length % 2 === 1) return sorted[(sorted.length - 1) / 2] ?? null
  const half = sorted.length / 2
  return ((sorted[half - 1] ?? 0) + (sorted[half] ?? 0)) / 2
}

export function runsIn(body: string): readonly Run[] {
  const found: Run[] = []
  for (const line of body.split("\n")) {
    if (line.trim() === "") continue
    const one = JSON.parse(line) as Record<string, unknown>
    found.push({
      phase: String(one["phase"] ?? ""),
      cpu: Number(one["cpuSeconds"] ?? 0) + Number(one["childCpuSeconds"] ?? 0),
      mem: one["peakMeasured"] === true ? Number(one["peakAddedBytes"] ?? 0) : null,
    })
  }
  return found
}

function memoryOf(some: readonly Run[]): readonly number[] {
  return some.flatMap((one) => (one.mem === null ? [] : [one.mem]))
}

export function costOf(check: string, runs: readonly Run[]): CheckCost {
  const patch = runs.filter((one) => one.phase === PATCH)
  const audit = runs.filter((one) => one.phase === AUDIT)
  return {
    check,
    patchCpu: medianOf(patch.map((one) => one.cpu)),
    patchMem: medianOf(memoryOf(patch)),
    auditCpu: medianOf(audit.map((one) => one.cpu)),
    auditMem: medianOf(memoryOf(audit)),
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

export function costsIn(root: string): Costs {
  let folders: readonly string[]
  try {
    folders = readdirSync(join(root, PAGES_AT))
  } catch {
    return { checks: [], unread: [], other: [] }
  }
  const checks: CheckCost[] = []
  const unread: string[] = []
  const other = new Map<string, number>()
  for (const folder of [...folders].sort()) {
    const name = namedIn(root, folder)
    if (name === undefined) continue
    const path = join(PAGES_AT, folder, name)
    let runs: readonly Run[]
    try {
      runs = runsIn(readFileSync(join(root, path), "utf8"))
    } catch {
      unread.push(path)
      continue
    }
    for (const one of runs) {
      if (one.phase === PATCH || one.phase === AUDIT) continue
      other.set(one.phase, (other.get(one.phase) ?? 0) + 1)
    }
    if (runs.length > 0) checks.push(costOf(folder, runs))
  }
  return {
    checks: [...checks].sort(byPatchCpu),
    unread,
    other: [...other].map(([phase, count]) => `${phase}: ${count}`),
  }
}

export function bytesAs(count: number): string {
  if (count >= GIB) return `${(count / GIB).toFixed(1)} GiB`
  if (count >= MIB) return `${(count / MIB).toFixed(1)} MiB`
  if (count >= KIB) return `${(count / KIB).toFixed(1)} KiB`
  return `${count} B`
}

export function secondsAs(count: number): string {
  return `${count.toFixed(3)}s`
}

function rowOf(one: CheckCost): readonly string[] {
  return [
    one.check,
    one.patchCpu === null ? ABSENT : secondsAs(one.patchCpu),
    one.patchMem === null ? ABSENT : bytesAs(one.patchMem),
    one.auditCpu === null ? ABSENT : secondsAs(one.auditCpu),
    one.auditMem === null ? ABSENT : bytesAs(one.auditMem),
  ]
}

export function linesOf(costs: Costs): readonly string[] {
  const said = [...columnsOf([HEADING, ...costs.checks.map(rowOf)])]
  if (costs.other.length > 0) said.push("", OTHER, ...costs.other)
  if (costs.unread.length > 0) said.push("", UNREAD, ...costs.unread)
  return said
}
