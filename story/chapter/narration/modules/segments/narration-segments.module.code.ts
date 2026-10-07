import {
  spokenScreen,
  spokenWindow,
} from "akasha/story/chapter/narration/modules/window-speaking/window-speaking.module.code.ts"
import {
  proseWindowSegmentsIn,
  type WrittenWindow,
} from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"

export type NarrationSegment = { text: string; pauseAfterMs: number; wordStart: number }

type Source = { readonly wordStart: number; readonly words: number }

type Block = Source & { sentences: string[]; pauseAfterMs: number }

type Counted = { words: number }

const WINDOW_FENCES = 2

const SENTENCE_PAUSE_MS = 150
const PARAGRAPH_PAUSE_MS = 450
const BREAK_PAUSE_MS = 900
const FIRST_LIMIT = 200
const LIMIT = 600

const RETURNS = /\r\n?/g
const FENCE = /^\s*(?:```|~~~)/
const WORDED = /[\p{L}\p{N}]/u
const BEAT = /^[\s.…"'“”‘’?!]+$/u
const INVISIBLE = /[​-‍⁠﻿­]/g
const HEADING = /^\s*#{1,6}\s+(.*)$/
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g
const PLACEHOLDER = /\[(?:image|img|picture|illustration)\b[^\]]*\]/gi
const LINK = /\[([^\]]+)\]\([^)]*\)/g
const URL = /(?:https?:\/\/|\bwww\.)\S+/gi
const TAG = /<\/?[a-z][^>]*>/gi
const ENTITY = /&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi
const NAMED: Readonly<Record<string, string>> = {
  amp: "&",
  nbsp: " ",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  copy: "",
  reg: "",
  trade: "",
}
const DASH_RUN = /\s*(?:[—–]{2,}|[—–]?-{2,}[—–]?)\s*/g
const GLUED_ELLIPSIS = /(…|\.{3,})(?=[\p{L}\p{N}])/gu
const BRACKETS = /[[\]【】〔〕]/g
const INNER_APOSTROPHE = /(?<=\p{L})[`´′ʼ‘’](?=\p{L})/gu
const ORNAMENT = /\p{So}+/gu
const LOOSE_COMMAS = /\s*,(?:\s*,)+/g
const COMMA_BEFORE_END = /\s*,\s*([.!?…:;]|$)/g
const TRAILING_JOIN = /[\s,:;]+$/
const OPEN_COMMA = /^[\s,]+/
const STRONG = /(\*\*|__)(.+?)\1/g
const EMPHASIS = /(^|[^\p{L}\p{N}*_])([*_])(?=\S)(.+?)(?<=\S)\2(?![\p{L}\p{N}])/gu
const MARKS = /[*`]+|(?<![\p{L}\p{N}])_+|_+(?![\p{L}\p{N}])/gu
const SPACES = /\s+/g
const ENDS_SPOKEN = /[.!?…]["'”’)\]]*$/
const BOUNDARY = /[.!?…]+["'”’)\]]*(?=\s+\S)/g
const CLOSERS = /["'”’)\]]+$/
const WORD_BEFORE = /([\p{L}.]+)\.$/u
const INITIAL = /(?:^|\s)\p{Lu}\.$/u
const LOWER = /\p{Ll}/u
const SOFT_BREAK = /[,;:—–]\s/g
const ABBREVIATIONS: ReadonlySet<string> = new Set([
  "mr",
  "mrs",
  "ms",
  "dr",
  "st",
  "sr",
  "jr",
  "prof",
  "mt",
  "vs",
  "etc",
  "e.g",
  "i.e",
  "lt",
  "col",
  "gen",
  "capt",
  "sgt",
  "rev",
  "approx",
])

function entityOf(whole: string, decimal?: string, hex?: string, name?: string): string {
  if (decimal !== undefined) return String.fromCodePoint(Number(decimal))
  if (hex !== undefined) return String.fromCodePoint(Number.parseInt(hex, 16))
  return NAMED[name?.toLowerCase() ?? ""] ?? whole
}

function plainOf(line: string): string {
  return line
    .replace(INVISIBLE, "")
    .replace(ENTITY, entityOf)
    .replace(IMAGE, "")
    .replace(PLACEHOLDER, "")
    .replace(LINK, "$1")
    .replace(URL, "")
    .replace(TAG, "")
    .replace(BRACKETS, "")
    .replace(INNER_APOSTROPHE, "'")
    .replace(STRONG, "$2")
    .replace(EMPHASIS, "$1$3")
    .replace(MARKS, "")
    .replace(ORNAMENT, " ")
    .replace(DASH_RUN, ", ")
    .replace(GLUED_ELLIPSIS, "$1 ")
    .replace(LOOSE_COMMAS, ",")
    .replace(COMMA_BEFORE_END, "$1")
    .replace(OPEN_COMMA, "")
    .replace(SPACES, " ")
    .trim()
}

function pauseAtLeast(blocks: Block[], pauseAfterMs: number): undefined {
  const last = blocks.at(-1)
  if (last !== undefined) last.pauseAfterMs = Math.max(last.pauseAfterMs, pauseAfterMs)
}

function spoken(line: string): string {
  const said = line.replace(TRAILING_JOIN, "")
  return ENDS_SPOKEN.test(said) ? said : `${said}.`
}

function endsSentence(text: string, end: number): boolean {
  if (LOWER.test(text.slice(end).trimStart().charAt(0))) return false
  const before = text.slice(0, end).replace(CLOSERS, "")
  if (!before.endsWith(".")) return true
  if (INITIAL.test(before)) return false
  const word = WORD_BEFORE.exec(before)?.[1]?.toLowerCase()
  return word === undefined || !ABBREVIATIONS.has(word)
}

export function sentencesOf(paragraph: string): string[] {
  const found: string[] = []
  let start = 0
  for (const match of paragraph.matchAll(BOUNDARY)) {
    const end = match.index + match[0].length
    if (!endsSentence(paragraph, end)) continue
    found.push(paragraph.slice(start, end).trim())
    start = end
  }
  const rest = paragraph.slice(start).trim()
  if (rest !== "") found.push(rest)
  return found
}

function cutAt(text: string, limit: number): number {
  const window = text.slice(0, limit)
  const soft = [...window.matchAll(SOFT_BREAK)].at(-1)
  if (soft !== undefined) return soft.index + 1
  const space = window.lastIndexOf(" ")
  return space > 0 ? space : limit
}

function piecesOf(sentence: string, limit: number): string[] {
  const pieces: string[] = []
  let rest = sentence
  while (rest.length > limit) {
    const at = cutAt(rest, limit)
    pieces.push(rest.slice(0, at).trim())
    rest = rest.slice(at).trim()
  }
  if (rest !== "") pieces.push(rest)
  return pieces
}

function pauseLast(blocks: Block[]): undefined {
  const last = blocks.at(-1)
  if (last !== undefined) last.pauseAfterMs = BREAK_PAUSE_MS
}

function worded(sentences: string[]): string[] {
  return sentences.filter((one) => WORDED.test(one))
}

function setApart(blocks: Block[], said: string[], source: Source): undefined {
  const sentences = worded(said)
  if (sentences.length === 0) return
  pauseLast(blocks)
  blocks.push({ sentences, pauseAfterMs: BREAK_PAUSE_MS, ...source })
}

function lineInto(blocks: Block[], line: string, source: Source): undefined {
  const seen = line.replace(INVISIBLE, "")
  if (seen.trim() === "") return
  if (!WORDED.test(seen)) {
    if (BEAT.test(seen)) pauseAtLeast(blocks, PARAGRAPH_PAUSE_MS)
    else pauseLast(blocks)
    return
  }
  const heading = HEADING.exec(line)?.[1]
  if (heading !== undefined) {
    const said = plainOf(heading)
    if (WORDED.test(said)) setApart(blocks, [spoken(said)], source)
    return
  }
  const said = plainOf(line)
  if (!WORDED.test(said)) return
  blocks.push({
    sentences: worded(sentencesOf(spoken(said))),
    pauseAfterMs: PARAGRAPH_PAUSE_MS,
    ...source,
  })
}

function proseInto(blocks: Block[], text: string, counted: Counted): undefined {
  let screen: string[] | null = null
  let screenAt = 0
  const screenOf = (): Source => ({ wordStart: screenAt, words: counted.words - screenAt })
  for (const line of text.split("\n")) {
    const wordStart = counted.words
    counted.words += wordCount(line)
    if (FENCE.test(line)) {
      if (screen !== null) setApart(blocks, spokenScreen(screen), screenOf())
      else screenAt = wordStart
      screen = screen === null ? [] : null
    } else if (screen === null) {
      lineInto(blocks, line, { wordStart, words: counted.words - wordStart })
    } else {
      screen.push(line)
    }
  }
  if (screen !== null) setApart(blocks, spokenScreen(screen), screenOf())
}

function windowWords(window: WrittenWindow): number {
  const level = window.level === undefined ? undefined : String(window.level)
  const fields = [window.name, window.rung, level, window.note]
  return fields.reduce(
    (sum, one) => (one === undefined ? sum : sum + 1 + wordCount(one)),
    WINDOW_FENCES
  )
}

function blocksOf(prose: string): Block[] {
  const blocks: Block[] = []
  const counted: Counted = { words: 0 }
  for (const run of proseWindowSegmentsIn(prose.replace(RETURNS, "\n"))) {
    if (run.kind === "prose") {
      proseInto(blocks, run.text, counted)
      continue
    }
    const words = windowWords(run.window)
    setApart(blocks, spokenWindow(run.window), { wordStart: counted.words, words })
    counted.words += words
  }
  return blocks
}

export function narrationSegmentsOf(prose: string): NarrationSegment[] {
  const segments: NarrationSegment[] = []
  for (const block of blocksOf(prose)) {
    const spokenWords = block.sentences.reduce((sum, one) => sum + wordCount(one), 0)
    let said = 0
    const at = (): number =>
      block.wordStart + (spokenWords === 0 ? 0 : Math.floor((said / spokenWords) * block.words))
    let packed = ""
    let packedAt = block.wordStart
    const flush = (): undefined => {
      if (packed !== "") {
        segments.push({ text: packed, pauseAfterMs: SENTENCE_PAUSE_MS, wordStart: packedAt })
      }
      packed = ""
    }
    for (const sentence of block.sentences) {
      const first = segments.length === 0 && packed === ""
      for (const piece of piecesOf(sentence, first ? FIRST_LIMIT : LIMIT)) {
        if (segments.length === 0) {
          segments.push({ text: piece, pauseAfterMs: SENTENCE_PAUSE_MS, wordStart: at() })
          said += wordCount(piece)
          continue
        }
        if (packed !== "" && packed.length + 1 + piece.length > LIMIT) flush()
        if (packed === "") packedAt = at()
        packed = packed === "" ? piece : `${packed} ${piece}`
        said += wordCount(piece)
      }
    }
    flush()
    const last = segments.at(-1)
    if (last !== undefined) last.pauseAfterMs = block.pauseAfterMs
  }
  const end = segments.at(-1)
  if (end !== undefined) end.pauseAfterMs = BREAK_PAUSE_MS
  return segments
}
