import { resolve } from "node:path"
import {
  type AnalysisInputs,
  type CyclomaticRow,
  collectCyclomaticRows,
  collectHalsteadRows,
  collectMaintainabilityRows,
  type HalsteadRow,
  type MaintainabilityRow,
  percentile,
  resolveAnalysisInputs,
} from "akasha/infrastructure/analysis-complexity/complexity-rows/complexity-rows.module.code.ts"

const REPORT_TOP = 10

export interface Wanted {
  readonly json: boolean
  readonly filePath?: string
  readonly threshold?: number
  readonly top?: number
}

function fmt(one: number, digits = 2): string {
  return one.toFixed(digits)
}

function inputsFor(root: string, file: string | undefined): AnalysisInputs {
  return resolveAnalysisInputs(file === undefined ? undefined : resolve(root, file))
}

function kept<T>(rows: readonly T[], top: number | undefined): readonly T[] {
  return top === undefined ? rows : rows.slice(0, top)
}

export function cyclomaticLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectCyclomaticRows(inputsFor(root, wanted.filePath))].sort((a, b) => {
    if (b.cc !== a.cc) return b.cc - a.cc
    if (a.file !== b.file) return a.file.localeCompare(b.file)
    return a.line - b.line
  })
  const least = wanted.threshold
  const over = least === undefined ? rows : rows.filter((one) => one.cc >= least)
  const shown = kept(over, wanted.top)
  if (wanted.json) return [JSON.stringify({ rows: shown })]
  return shown.map((one) => `${one.file}\t${one.function}\t${one.line}\t${one.cc}`)
}

export function halsteadLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectHalsteadRows(inputsFor(root, wanted.filePath))].sort((a, b) => {
    if (b.volume !== a.volume) return b.volume - a.volume
    if (a.file !== b.file) return a.file.localeCompare(b.file)
    return a.line - b.line
  })
  const least = wanted.threshold
  const over = least === undefined ? rows : rows.filter((one) => one.volume >= least)
  const shown = kept(over, wanted.top)
  if (wanted.json) return [JSON.stringify({ rows: shown })]
  return shown.map(
    (one) =>
      `${one.file}\t${one.function}\t${one.line}\t${one.n1}\t${one.n2}\t${one.N1}\t${one.N2}\t` +
      `${fmt(one.volume)}\t${fmt(one.difficulty)}\t${fmt(one.effort)}\t${fmt(one.time)}\t${fmt(one.bugs)}`
  )
}

export function maintainabilityLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectMaintainabilityRows(inputsFor(root, wanted.filePath))].sort((a, b) => {
    if (a.mi !== b.mi) return a.mi - b.mi
    return a.file.localeCompare(b.file)
  })
  const most = wanted.threshold
  const under = most === undefined ? rows : rows.filter((one) => one.mi <= most)
  const shown = kept(under, wanted.top)
  if (wanted.json) return [JSON.stringify({ rows: shown })]
  return shown.map(
    (one) => `${one.file}\t${fmt(one.mi, 1)}\t${one.sloc}\t${one.ccSum}\t${fmt(one.volumeSum)}`
  )
}

export interface MetricSummary {
  readonly p50: number
  readonly p75: number
  readonly p90: number
  readonly p95: number
  readonly p99: number
  readonly max: number
  readonly count: number
}

export function summaryOf(values: readonly number[]): MetricSummary {
  const sorted = [...values].sort((a, b) => a - b)
  return {
    p50: percentile(sorted, 50),
    p75: percentile(sorted, 75),
    p90: percentile(sorted, 90),
    p95: percentile(sorted, 95),
    p99: percentile(sorted, 99),
    max: sorted[sorted.length - 1] ?? 0,
    count: sorted.length,
  }
}

function sectionLines(title: string, summary: MetricSummary, digits: number): readonly string[] {
  return [
    `# ${title}  (n=${summary.count})`,
    `p50\t${fmt(summary.p50, digits)}`,
    `p75\t${fmt(summary.p75, digits)}`,
    `p90\t${fmt(summary.p90, digits)}`,
    `p95\t${fmt(summary.p95, digits)}`,
    `p99\t${fmt(summary.p99, digits)}`,
    `max\t${fmt(summary.max, digits)}`,
  ]
}

interface Rolled {
  readonly cyclomatic: MetricSummary & { readonly top: readonly CyclomaticRow[] }
  readonly halstead: MetricSummary & { readonly top: readonly HalsteadRow[] }
  readonly maintainability: MetricSummary & { readonly top: readonly MaintainabilityRow[] }
}

export function reportLines(wanted: Wanted, root: string): readonly string[] {
  const top = wanted.top ?? REPORT_TOP
  const inputs = inputsFor(root, undefined)
  const cc = collectCyclomaticRows(inputs)
  const hs = collectHalsteadRows(inputs)
  const mi = collectMaintainabilityRows(inputs)
  const ccTop = [...cc].sort((a, b) => b.cc - a.cc).slice(0, top)
  const hsTop = [...hs].sort((a, b) => b.volume - a.volume).slice(0, top)
  const miTop = [...mi].sort((a, b) => a.mi - b.mi).slice(0, top)
  const ccSaid = summaryOf(cc.map((one) => one.cc))
  const hsSaid = summaryOf(hs.map((one) => one.volume))
  const miSaid = summaryOf(mi.map((one) => one.mi))
  if (wanted.json) {
    const rolled: Rolled = {
      cyclomatic: { ...ccSaid, top: ccTop },
      halstead: { ...hsSaid, top: hsTop },
      maintainability: { ...miSaid, top: miTop },
    }
    return [JSON.stringify(rolled)]
  }
  const lines: string[] = [...sectionLines("Cyclomatic Complexity (per function)", ccSaid, 0)]
  if (ccTop.length > 0) {
    lines.push("", "## top by cc")
    for (const one of ccTop) lines.push(`${one.cc}\t${one.file}\t${one.function}:${one.line}`)
  }
  lines.push("", ...sectionLines("Halstead Volume (per function)", hsSaid, 2))
  if (hsTop.length > 0) {
    lines.push("", "## top by volume")
    for (const one of hsTop) {
      lines.push(`${fmt(one.volume)}\t${one.file}\t${one.function}:${one.line}`)
    }
  }
  lines.push("", ...sectionLines("Maintainability Index (per file)", miSaid, 1))
  if (miTop.length > 0) {
    lines.push("", "## bottom by mi")
    for (const one of miTop) lines.push(`${fmt(one.mi, 1)}\t${one.file}`)
  }
  return lines
}
