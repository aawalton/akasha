import {
  spokenScreen,
  spokenWindow,
} from "akasha/story/chapter/narration/modules/window-speaking/window-speaking.module.code.ts"
import { proseWindowSegmentsIn } from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"

export type NarrationSegment = { text: string; pauseAfterMs: number }

type Block = { sentences: string[]; pauseAfterMs: number }

const SENTENCE_PAUSE_MS = 150
const PARAGRAPH_PAUSE_MS = 450
const BREAK_PAUSE_MS = 900
const FIRST_LIMIT = 200
const LIMIT = 600

const RETURNS = /\r\n?/g
const FENCE = /^\s*(?:```|~~~)/
const SCENE_BREAK = /^\s*(?:[*\-_~=#•·◇◆○●]\s*){3,}$/
const HEADING = /^\s*#{1,6}\s+(.*)$/
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g
const LINK = /\[([^\]]+)\]\([^)]*\)/g
const TAG = /<\/?[a-z][^>]*>/gi
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

function plainOf(line: string): string {
  return line
    .replace(IMAGE, "")
    .replace(LINK, "$1")
    .replace(TAG, "")
    .replace(STRONG, "$2")
    .replace(EMPHASIS, "$1$3")
    .replace(MARKS, "")
    .replace(SPACES, " ")
    .trim()
}

function spoken(line: string): string {
  return ENDS_SPOKEN.test(line) ? line : `${line}.`
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

function setApart(blocks: Block[], sentences: string[]): undefined {
  if (sentences.length === 0) return
  pauseLast(blocks)
  blocks.push({ sentences, pauseAfterMs: BREAK_PAUSE_MS })
}

function lineInto(blocks: Block[], line: string): undefined {
  if (SCENE_BREAK.test(line)) {
    pauseLast(blocks)
    return
  }
  const heading = HEADING.exec(line)?.[1]
  if (heading !== undefined) {
    const said = plainOf(heading)
    if (said !== "") setApart(blocks, [spoken(said)])
    return
  }
  const said = plainOf(line)
  if (said === "") return
  blocks.push({ sentences: sentencesOf(spoken(said)), pauseAfterMs: PARAGRAPH_PAUSE_MS })
}

function proseInto(blocks: Block[], text: string): undefined {
  let screen: string[] | null = null
  for (const line of text.split("\n")) {
    if (FENCE.test(line)) {
      if (screen !== null) setApart(blocks, spokenScreen(screen))
      screen = screen === null ? [] : null
    } else if (screen === null) {
      lineInto(blocks, line)
    } else {
      screen.push(line)
    }
  }
  if (screen !== null) setApart(blocks, spokenScreen(screen))
}

function blocksOf(prose: string): Block[] {
  const blocks: Block[] = []
  for (const run of proseWindowSegmentsIn(prose.replace(RETURNS, "\n"))) {
    if (run.kind === "prose") proseInto(blocks, run.text)
    else setApart(blocks, spokenWindow(run.window))
  }
  return blocks
}

export function narrationSegmentsOf(prose: string): NarrationSegment[] {
  const segments: NarrationSegment[] = []
  for (const block of blocksOf(prose)) {
    let packed = ""
    const flush = (): undefined => {
      if (packed !== "") segments.push({ text: packed, pauseAfterMs: SENTENCE_PAUSE_MS })
      packed = ""
    }
    for (const sentence of block.sentences) {
      const first = segments.length === 0 && packed === ""
      for (const piece of piecesOf(sentence, first ? FIRST_LIMIT : LIMIT)) {
        if (segments.length === 0) {
          segments.push({ text: piece, pauseAfterMs: SENTENCE_PAUSE_MS })
          continue
        }
        if (packed !== "" && packed.length + 1 + piece.length > LIMIT) flush()
        packed = packed === "" ? piece : `${packed} ${piece}`
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
