import { z } from "zod"
import { BeatSchema } from "../beat-schema/beat-schema.module.code.ts"
import { wordCount } from "../word-count/word-count.module.code.ts"

export interface DerivedTurn {
  readonly externalId: string
  readonly turnNumber: number
  readonly text: string
  readonly length: number
  readonly src: { readonly ch: string; readonly beat?: number }
}

export interface DeriveLogTurnsOptions {
  readonly prefix: string
  readonly from?: number
  readonly to?: number
}

export interface DeriveLogTurnsResult {
  readonly turns: readonly DerivedTurn[]
  readonly skipped: readonly number[]
}

interface ChapterRange {
  readonly title: string
  readonly start: number
  readonly end: number
}

function beatNum(id: unknown): number | undefined {
  if (typeof id === "number") return Number.isFinite(id) ? id : undefined
  if (typeof id !== "string") return undefined
  let digits = ""
  for (const ch of id) {
    if (ch >= "0" && ch <= "9") digits += ch
  }
  if (digits.length === 0) return undefined
  const n = Number.parseInt(digits, 10)
  return Number.isNaN(n) ? undefined : n
}

const ChapterRawSchema = z
  .object({
    title: z.string(),
    startBeat: z.union([z.string(), z.number()]),
    endBeat: z.union([z.string(), z.number()]).optional(),
  })
  .passthrough()

function buildChapterRanges(chapters: readonly unknown[]): readonly ChapterRange[] {
  const ranges: ChapterRange[] = []
  for (const raw of chapters) {
    const parsed = ChapterRawSchema.safeParse(raw)
    if (!parsed.success) continue
    const entry = parsed.data
    const start = beatNum(entry.startBeat)
    if (start === undefined) continue
    const end =
      entry.endBeat !== undefined
        ? (beatNum(entry.endBeat) ?? Number.POSITIVE_INFINITY)
        : Number.POSITIVE_INFINITY
    ranges.push({ title: entry.title, start, end })
  }
  return ranges
}

function chapterTitleForBeat(n: number, ranges: readonly ChapterRange[]): string | undefined {
  for (const range of ranges) {
    if (n >= range.start && n <= range.end) return range.title
  }
  return undefined
}

export function deriveLogTurns(
  log: readonly unknown[],
  chapters: readonly unknown[],
  opts: DeriveLogTurnsOptions
): DeriveLogTurnsResult {
  const { prefix, from, to } = opts
  const ranges = buildChapterRanges(chapters)

  const textsByTurn = new Map<number, string[]>()
  const firstBeatByTurn = new Map<number, unknown>()
  const order: number[] = []
  for (const raw of log) {
    const parsed = BeatSchema.safeParse(raw)
    if (!parsed.success) continue
    const beat = parsed.data
    if (beat.type !== "narrative") continue
    if (typeof beat.turn !== "number") continue
    const turn = beat.turn
    if (from !== undefined && turn < from) continue
    if (to !== undefined && turn > to) continue
    let texts = textsByTurn.get(turn)
    if (texts === undefined) {
      texts = []
      textsByTurn.set(turn, texts)
      firstBeatByTurn.set(turn, beat.id)
      order.push(turn)
    }
    texts.push(beat.text)
  }

  const turns: DerivedTurn[] = []
  for (const turn of order) {
    const texts = textsByTurn.get(turn)
    if (texts === undefined) continue
    const text = texts.join("\n\n")
    const beat = beatNum(firstBeatByTurn.get(turn))
    const ch = (beat !== undefined ? chapterTitleForBeat(beat, ranges) : undefined) ?? String(turn)
    const src = beat !== undefined ? { ch, beat } : { ch }
    turns.push({
      externalId: `${prefix}-t${turn}`,
      turnNumber: turn,
      text,
      length: wordCount(text),
      src,
    })
  }
  turns.sort((a, b) => a.turnNumber - b.turnNumber)

  const skipped: number[] = []
  if (from !== undefined && to !== undefined) {
    const present = new Set(turns.map((t) => t.turnNumber))
    for (let n = from; n <= to; n += 1) {
      if (!present.has(n)) skipped.push(n)
    }
  }

  return { turns, skipped }
}
