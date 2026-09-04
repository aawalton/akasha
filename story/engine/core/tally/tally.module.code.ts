import {
  type BoundaryCumulative,
  type BoundaryTurnResult,
  classifyTurnBoundary,
  compileBoundary,
  distribution,
  rollupBoundary,
  type TallyDistribution,
} from "../tally-boundary/tally-boundary.module.code.ts"
import {
  type TallyCatalog,
  TallyCatalogError,
  type TallyPattern,
  type TallyPatternFamily,
} from "../tally-catalog/tally-catalog.module.code.ts"

export interface TallyTurnInput {
  readonly externalId: string
  readonly turnNumber?: number
  readonly title?: string
  readonly text: string
}

export interface TallyPatternHit {
  readonly id: string
  readonly family: TallyPatternFamily
  readonly provenance: string
  readonly count: number
  readonly per1k: number
  readonly samples: readonly string[]
}

export interface TallyTurnResult {
  readonly externalId: string
  readonly turnNumber: number | null
  readonly title: string | null
  readonly words: number
  readonly sentences: number
  readonly paragraphs: number
  readonly hits: readonly TallyPatternHit[]
  readonly boundary?: BoundaryTurnResult
}

export interface TallyFamilyTotal {
  readonly family: TallyPatternFamily
  readonly count: number
  readonly per1k: number
}

export interface TallyCumulative {
  readonly turns: number
  readonly words: number
  readonly sentences: number
  readonly paragraphs: number
  readonly turnLengthWords: TallyDistribution
  readonly patternTotals: readonly TallyPatternHit[]
  readonly familyTotals: readonly TallyFamilyTotal[]
  readonly boundary?: BoundaryCumulative
}

export interface TallyResult {
  readonly catalogVersion: number | null
  readonly perTurn: readonly TallyTurnResult[]
  readonly cumulative: TallyCumulative
}

export interface ComputeTallyOptions {
  readonly maxSamplesPerPattern?: number
}

const DEFAULT_MAX_SAMPLES = 5

const WORD_TOKEN = /[\p{L}\p{N}]/u

export function countWords(text: string): number {
  let n = 0
  for (const token of text.split(/\s+/)) {
    if (token.length > 0 && WORD_TOKEN.test(token)) n += 1
  }
  return n
}

export function countSentences(text: string): number {
  return [...text.matchAll(/[.!?]+/g)].length
}

export function countParagraphs(text: string): number {
  let n = 0
  for (const block of text.split(/\n+/)) {
    if (block.trim().length > 0) n += 1
  }
  return n
}

function compilePattern(pattern: TallyPattern): RegExp {
  const flags = new Set((pattern.flags ?? "").split(""))
  flags.add("g")
  try {
    return new RegExp(pattern.regex, [...flags].join(""))
  } catch (err) {
    throw new TallyCatalogError(
      `pattern "${pattern.id}" has an invalid regex: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}

interface CompiledPattern {
  readonly pattern: TallyPattern
  readonly regex: RegExp
}

function compileCatalog(catalog: TallyCatalog): readonly CompiledPattern[] {
  return catalog.patterns.map((pattern) => ({ pattern, regex: compilePattern(pattern) }))
}

function per1k(count: number, words: number): number {
  return words > 0 ? (count / words) * 1000 : 0
}

function matchPattern(
  regex: RegExp,
  text: string,
  maxSamples: number
): { count: number; samples: readonly string[] } {
  let count = 0
  const samples: string[] = []
  for (const m of text.matchAll(regex)) {
    count += 1
    if (samples.length < maxSamples) samples.push(m[0])
  }
  return { count, samples }
}

export function scoredTurnSpan(
  turns: readonly TallyTurnInput[]
): { from: number; to: number } | null {
  let from: number | null = null
  let to: number | null = null
  for (const t of turns) {
    if (t.turnNumber === undefined) continue
    if (from === null || t.turnNumber < from) from = t.turnNumber
    if (to === null || t.turnNumber > to) to = t.turnNumber
  }
  return from !== null && to !== null ? { from, to } : null
}

export function computeTally(
  turns: readonly TallyTurnInput[],
  catalog: TallyCatalog | null,
  options?: ComputeTallyOptions
): TallyResult {
  const maxSamples = options?.maxSamplesPerPattern ?? DEFAULT_MAX_SAMPLES
  const compiled = catalog === null ? [] : compileCatalog(catalog)

  const compiledBoundary = catalog?.boundaryLens ? compileBoundary(catalog.boundaryLens) : null

  const perTurn: TallyTurnResult[] = turns.map((turn) => {
    const words = countWords(turn.text)
    const hits: TallyPatternHit[] = compiled.map(({ pattern, regex }) => {
      const { count, samples } = matchPattern(regex, turn.text, maxSamples)
      return {
        id: pattern.id,
        family: pattern.family,
        provenance: pattern.provenance,
        count,
        per1k: per1k(count, words),
        samples,
      }
    })
    const boundary: BoundaryTurnResult | undefined =
      compiledBoundary !== null ? classifyTurnBoundary(turn.text, compiledBoundary) : undefined
    return {
      externalId: turn.externalId,
      turnNumber: turn.turnNumber ?? null,
      title: turn.title ?? null,
      words,
      sentences: countSentences(turn.text),
      paragraphs: countParagraphs(turn.text),
      hits,
      ...(boundary !== undefined ? { boundary } : {}),
    }
  })

  const totalWords = perTurn.reduce((acc, t) => acc + t.words, 0)
  const totalSentences = perTurn.reduce((acc, t) => acc + t.sentences, 0)
  const totalParagraphs = perTurn.reduce((acc, t) => acc + t.paragraphs, 0)

  const patternTotals: TallyPatternHit[] = compiled.map(({ pattern, regex }) => {
    let count = 0
    const samples: string[] = []
    for (const turn of turns) {
      const m = matchPattern(regex, turn.text, maxSamples - samples.length)
      count += m.count
      for (const s of m.samples) if (samples.length < maxSamples) samples.push(s)
    }
    return {
      id: pattern.id,
      family: pattern.family,
      provenance: pattern.provenance,
      count,
      per1k: per1k(count, totalWords),
      samples,
    }
  })

  const familyTotals: TallyFamilyTotal[] = []
  for (const total of patternTotals) {
    const existing = familyTotals.find((f) => f.family === total.family)
    if (existing === undefined) {
      familyTotals.push({ family: total.family, count: total.count, per1k: 0 })
    } else {
      const idx = familyTotals.indexOf(existing)
      familyTotals[idx] = { ...existing, count: existing.count + total.count }
    }
  }
  const familyTotalsFinal: TallyFamilyTotal[] = familyTotals.map((f) => ({
    ...f,
    per1k: per1k(f.count, totalWords),
  }))

  const boundaryCumulative: BoundaryCumulative | undefined =
    compiledBoundary !== null
      ? rollupBoundary(
          perTurn.flatMap((t) =>
            t.boundary !== undefined
              ? [{ boundary: t.boundary, turnNumber: t.turnNumber, words: t.words }]
              : []
          ),
          compiledBoundary.runThreshold
        )
      : undefined

  return {
    catalogVersion: catalog?.catalogVersion ?? null,
    perTurn,
    cumulative: {
      turns: perTurn.length,
      words: totalWords,
      sentences: totalSentences,
      paragraphs: totalParagraphs,
      turnLengthWords: distribution(perTurn.map((t) => t.words)),
      patternTotals,
      familyTotals: familyTotalsFinal,
      ...(boundaryCumulative !== undefined ? { boundary: boundaryCumulative } : {}),
    },
  }
}
