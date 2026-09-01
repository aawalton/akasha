import type {
  BoundaryClassifier,
  BoundaryLens,
} from "../tally-catalog/tally-catalog.module.code.ts"
import { TallyCatalogError } from "../tally-catalog/tally-catalog.module.code.ts"

export interface TallyDistribution {
  readonly mean: number
  readonly median: number
  readonly min: number
  readonly max: number
  readonly stdev: number
}

export function distribution(values: readonly number[]): TallyDistribution {
  if (values.length === 0) return { mean: 0, median: 0, min: 0, max: 0, stdev: 0 }
  const sorted = [...values].sort((a, b) => a - b)
  const n = sorted.length
  const sum = sorted.reduce((acc, v) => acc + v, 0)
  const mean = sum / n
  const mid = Math.floor(n / 2)
  const lo = sorted[mid - 1] ?? 0
  const hi = sorted[mid] ?? 0
  const median = n % 2 === 0 ? (lo + hi) / 2 : hi
  const variance = sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n
  return {
    mean,
    median,
    min: sorted[0] ?? 0,
    max: sorted[n - 1] ?? 0,
    stdev: Math.sqrt(variance),
  }
}

export interface BoundaryTurnResult {
  readonly headCategory: string
  readonly headSample: string
  readonly closeState: string
  readonly closeSample: string
  readonly youInitial: boolean
}

export interface BoundaryRun {
  readonly category: string
  readonly length: number
  readonly fromIndex: number
  readonly toIndex: number
  readonly fromTurnNumber: number | null
  readonly toTurnNumber: number | null
}

export interface BoundaryBucket {
  readonly category: string
  readonly turns: number
  readonly turnLengthWords: TallyDistribution
}

export interface BoundaryColumnRollup {
  readonly longestRun: BoundaryRun | null
  readonly uniformRuns: readonly BoundaryRun[]
  readonly buckets: readonly BoundaryBucket[]
}

export interface BoundaryYouInitialRollup {
  readonly longestRun: BoundaryRun | null
  readonly uniformRuns: readonly BoundaryRun[]
}

export interface BoundaryCumulative {
  readonly runThreshold: number
  readonly head: BoundaryColumnRollup
  readonly close: BoundaryColumnRollup
  readonly youInitial: BoundaryYouInitialRollup
}

const YOU_INITIAL_LABEL = "you-initial"
const NOT_YOU_INITIAL_LABEL = "other"

function splitSentences(text: string): readonly string[] {
  const out: string[] = []
  for (const m of text.trim().matchAll(/[^.!?]*[.!?]+|[^.!?]+$/g)) {
    const s = m[0].trim()
    if (s.length > 0) out.push(s)
  }
  return out
}

function boundarySpans(text: string): { head: string; close: string } {
  const sentences = splitSentences(text)
  if (sentences.length === 0) return { head: "", close: "" }
  return { head: sentences[0] ?? "", close: sentences[sentences.length - 1] ?? "" }
}

function compileTestRegex(source: string, flags: string | undefined, label: string): RegExp {
  const kept = new Set((flags ?? "").split(""))
  kept.delete("g")
  kept.delete("y")
  try {
    return new RegExp(source, [...kept].join(""))
  } catch (err) {
    throw new TallyCatalogError(
      `boundary screen "${label}" has an invalid regex: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

interface CompiledScreen {
  readonly category: string
  readonly regex: RegExp
}
interface CompiledClassifier {
  readonly screens: readonly CompiledScreen[]
  readonly fallback: string
}

export interface CompiledBoundary {
  readonly head: CompiledClassifier
  readonly close: CompiledClassifier
  readonly youInitial: RegExp
  readonly runThreshold: number
}

function compileClassifier(classifier: BoundaryClassifier, which: string): CompiledClassifier {
  return {
    screens: classifier.screens.map((s) => ({
      category: s.category,
      regex: compileTestRegex(s.regex, s.flags, `${which}:${s.category}`),
    })),
    fallback: classifier.fallback,
  }
}

export function compileBoundary(lens: BoundaryLens): CompiledBoundary {
  return {
    head: compileClassifier(lens.head, "head"),
    close: compileClassifier(lens.close, "close"),
    youInitial: compileTestRegex(lens.youInitial.regex, lens.youInitial.flags, "youInitial"),
    runThreshold: lens.runThreshold,
  }
}

function classify(span: string, classifier: CompiledClassifier): string {
  for (const screen of classifier.screens) {
    if (screen.regex.test(span)) return screen.category
  }
  return classifier.fallback
}

export function classifyTurnBoundary(text: string, cb: CompiledBoundary): BoundaryTurnResult {
  const spans = boundarySpans(text)
  return {
    headCategory: classify(spans.head, cb.head),
    headSample: spans.head,
    closeState: classify(spans.close, cb.close),
    closeSample: spans.close,
    youInitial: cb.youInitial.test(spans.head),
  }
}

function maximalRuns(
  labels: readonly string[],
  turnNumbers: readonly (number | null)[]
): readonly BoundaryRun[] {
  const runs: BoundaryRun[] = []
  let start = 0
  for (let i = 1; i <= labels.length; i += 1) {
    if (i === labels.length || labels[i] !== labels[start]) {
      runs.push({
        category: labels[start] ?? "",
        length: i - start,
        fromIndex: start,
        toIndex: i - 1,
        fromTurnNumber: turnNumbers[start] ?? null,
        toTurnNumber: turnNumbers[i - 1] ?? null,
      })
      start = i
    }
  }
  return runs
}

function longestOf(runs: readonly BoundaryRun[]): BoundaryRun | null {
  let best: BoundaryRun | null = null
  for (const run of runs) {
    if (best === null || run.length > best.length) best = run
  }
  return best
}

function boundaryBuckets(
  labels: readonly string[],
  words: readonly number[]
): readonly BoundaryBucket[] {
  const order: string[] = []
  const byCategory = new Map<string, number[]>()
  labels.forEach((label, i) => {
    let ws = byCategory.get(label)
    if (ws === undefined) {
      ws = []
      byCategory.set(label, ws)
      order.push(label)
    }
    ws.push(words[i] ?? 0)
  })
  return order.map((category) => {
    const ws = byCategory.get(category) ?? []
    return { category, turns: ws.length, turnLengthWords: distribution(ws) }
  })
}

function columnRollup(
  labels: readonly string[],
  turnNumbers: readonly (number | null)[],
  words: readonly number[],
  threshold: number
): BoundaryColumnRollup {
  const runs = maximalRuns(labels, turnNumbers)
  return {
    longestRun: longestOf(runs),
    uniformRuns: runs.filter((r) => r.length >= threshold),
    buckets: boundaryBuckets(labels, words),
  }
}

export interface BoundaryRollupTurn {
  readonly boundary: BoundaryTurnResult
  readonly turnNumber: number | null
  readonly words: number
}

export function rollupBoundary(
  turns: readonly BoundaryRollupTurn[],
  runThreshold: number
): BoundaryCumulative {
  const turnNumbers = turns.map((t) => t.turnNumber)
  const words = turns.map((t) => t.words)
  const headLabels = turns.map((t) => t.boundary.headCategory)
  const closeLabels = turns.map((t) => t.boundary.closeState)
  const youLabels = turns.map((t) =>
    t.boundary.youInitial ? YOU_INITIAL_LABEL : NOT_YOU_INITIAL_LABEL
  )
  const youInitialRuns = maximalRuns(youLabels, turnNumbers).filter(
    (r) => r.category === YOU_INITIAL_LABEL
  )
  return {
    runThreshold,
    head: columnRollup(headLabels, turnNumbers, words, runThreshold),
    close: columnRollup(closeLabels, turnNumbers, words, runThreshold),
    youInitial: {
      longestRun: longestOf(youInitialRuns),
      uniformRuns: youInitialRuns.filter((r) => r.length >= runThreshold),
    },
  }
}
