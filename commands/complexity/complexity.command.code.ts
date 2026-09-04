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
} from "@akasha/analysis-complexity/complexity-rows"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const CYCLOMATIC = "cyclomatic"

export const HALSTEAD = "halstead"

export const MAINTAINABILITY = "maintainability"

export const REPORT = "report"

export const FILE = "--file"

export const THRESHOLD = "--threshold"

export const TOP = "--top"

export const AS_JSON = "--json"

const ACTS: readonly string[] = [CYCLOMATIC, HALSTEAD, MAINTAINABILITY, REPORT]

const VALUED: readonly string[] = [FILE, THRESHOLD, TOP]

const FLAGS: readonly string[] = [FILE, THRESHOLD, TOP, AS_JSON]

const REPORT_TOP = 10

export interface Wanted {
  readonly act: string
  readonly file: string | null
  readonly threshold: number | null
  readonly top: number | null
  readonly asJson: boolean
}

export type Read = Wanted | { readonly refused: readonly string[] }

function said(words: readonly string[]): string {
  return words.map((one) => `\`${one}\``).join(", ")
}

function wholeOf(flag: string, value: string | undefined): number | string {
  if (value === undefined) return `${flag} names a whole number and nothing followed it`
  const many = Number(value)
  if (!Number.isInteger(many) || many < 0) {
    return `${flag} names a whole number of nought or more, and \`${value}\` is none`
  }
  return many
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let act: string | null = null
  let file: string | null = null
  let threshold: number | null = null
  let top: number | null = null
  let asJson = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === AS_JSON) {
      asJson = true
      continue
    }
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (one === FILE) {
        if (value === undefined) refusals.push(`${FILE} names a path and nothing followed it`)
        else file = value
        continue
      }
      const many = wholeOf(one, value)
      if (typeof many === "string") refusals.push(many)
      else if (one === THRESHOLD) threshold = many
      else top = many
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(`\`${one}\` is no flag this takes — it takes ${said(FLAGS)}`)
      continue
    }
    if (act !== null) {
      refusals.push(`\`${one}\` follows the act \`${act}\`, and one call names one act`)
      continue
    }
    act = one
  }
  if (act === null) {
    return { refused: [...refusals, `this names no act — it carries ${said(ACTS)}`] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act this carries — it carries ${said(ACTS)}`)
  } else if (act === REPORT) {
    if (file !== null) {
      refusals.push(
        `${FILE} names one file to read, and \`${REPORT}\` is taken over the whole workspace`
      )
    }
    if (threshold !== null) {
      refusals.push(
        `${THRESHOLD} keeps the rows at a figure, and \`${REPORT}\` counts every row there is`
      )
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, file, threshold, top, asJson }
}

function fmt(one: number, digits = 2): string {
  return one.toFixed(digits)
}

function inputsFor(root: string, file: string | null): AnalysisInputs {
  return resolveAnalysisInputs(file === null ? undefined : resolve(root, file))
}

function kept<T>(rows: readonly T[], top: number | null): readonly T[] {
  return top === null ? rows : rows.slice(0, top)
}

function cyclomaticLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectCyclomaticRows(inputsFor(root, wanted.file))].sort((a, b) => {
    if (b.cc !== a.cc) return b.cc - a.cc
    if (a.file !== b.file) return a.file.localeCompare(b.file)
    return a.line - b.line
  })
  const floor = wanted.threshold
  const over = floor === null ? rows : rows.filter((one) => one.cc >= floor)
  const shown = kept(over, wanted.top)
  if (wanted.asJson) return [JSON.stringify({ rows: shown })]
  return shown.map((one) => `${one.file}\t${one.function}\t${one.line}\t${one.cc}`)
}

function halsteadLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectHalsteadRows(inputsFor(root, wanted.file))].sort((a, b) => {
    if (b.volume !== a.volume) return b.volume - a.volume
    if (a.file !== b.file) return a.file.localeCompare(b.file)
    return a.line - b.line
  })
  const floor = wanted.threshold
  const over = floor === null ? rows : rows.filter((one) => one.volume >= floor)
  const shown = kept(over, wanted.top)
  if (wanted.asJson) return [JSON.stringify({ rows: shown })]
  return shown.map(
    (one) =>
      `${one.file}\t${one.function}\t${one.line}\t${one.n1}\t${one.n2}\t${one.N1}\t${one.N2}\t` +
      `${fmt(one.volume)}\t${fmt(one.difficulty)}\t${fmt(one.effort)}\t${fmt(one.time)}\t${fmt(one.bugs)}`
  )
}

function maintainabilityLines(wanted: Wanted, root: string): readonly string[] {
  const rows = [...collectMaintainabilityRows(inputsFor(root, wanted.file))].sort((a, b) => {
    if (a.mi !== b.mi) return a.mi - b.mi
    return a.file.localeCompare(b.file)
  })
  const ceiling = wanted.threshold
  const under = ceiling === null ? rows : rows.filter((one) => one.mi <= ceiling)
  const shown = kept(under, wanted.top)
  if (wanted.asJson) return [JSON.stringify({ rows: shown })]
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

function reportLines(wanted: Wanted, root: string): readonly string[] {
  const top = wanted.top ?? REPORT_TOP
  const inputs = inputsFor(root, null)
  const cc = collectCyclomaticRows(inputs)
  const hs = collectHalsteadRows(inputs)
  const mi = collectMaintainabilityRows(inputs)
  const ccTop = [...cc].sort((a, b) => b.cc - a.cc).slice(0, top)
  const hsTop = [...hs].sort((a, b) => b.volume - a.volume).slice(0, top)
  const miTop = [...mi].sort((a, b) => a.mi - b.mi).slice(0, top)
  const ccSaid = summaryOf(cc.map((one) => one.cc))
  const hsSaid = summaryOf(hs.map((one) => one.volume))
  const miSaid = summaryOf(mi.map((one) => one.mi))
  if (wanted.asJson) {
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

function linesFor(wanted: Wanted, root: string): readonly string[] {
  if (wanted.act === CYCLOMATIC) return cyclomaticLines(wanted, root)
  if (wanted.act === HALSTEAD) return halsteadLines(wanted, root)
  if (wanted.act === MAINTAINABILITY) return maintainabilityLines(wanted, root)
  return reportLines(wanted, root)
}

export function complexity(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return { report: [...linesFor(read, resolve(given.root))], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
