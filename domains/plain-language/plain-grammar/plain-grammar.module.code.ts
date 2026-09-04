import type { Answering } from "@akasha/indexes/answering"
import type { Grammar, Parsed } from "../phrase-parsing/phrase-parsing.module.code.ts"
import { grammarOf, parsed } from "../phrase-parsing/phrase-parsing.module.code.ts"
import type { Shape } from "../shape-reading/shape-reading.module.code.ts"
import { shapesIn } from "../shape-reading/shape-reading.module.code.ts"
import { classesOf, wordsIn } from "../word-classing/word-classing.module.code.ts"

export const START = "S"

const SPELT = /`[^`]*`/g

export function scanned(text: string): string {
  return text.replace(SPELT, (held) => `\`${"x".repeat(held.length - 2)}\``)
}

export type Refused = {
  readonly slug: string
  readonly reason: string | null
  readonly grammar: Grammar
}

export type Marked = {
  readonly slug: string
  readonly reason: string | null
  readonly pattern: RegExp
}

export type Grammars = {
  readonly plain: Grammar
  readonly refused: readonly Refused[]
  readonly marked: readonly Marked[]
}

export function grammarsFrom(shapes: readonly Shape[]): Grammars {
  const admitted = shapes.filter((one) => one.allowed !== false).flatMap((one) => one.rules)
  const refused = shapes
    .filter((one) => one.allowed === false)
    .map((one) => ({
      slug: one.slug,
      reason: one.reason,
      grammar: grammarOf([...admitted, ...one.rules], START),
    }))
  const marked = shapes
    .filter((one) => one.allowed === false && one.pattern !== null)
    .map((one) => ({
      slug: one.slug,
      reason: one.reason,
      pattern: new RegExp(one.pattern ?? ""),
    }))
  return { plain: grammarOf(admitted, START), refused, marked }
}

export type Said = Parsed & {
  readonly words: readonly string[]
  readonly stoppedOn: string | null
  readonly shape: string | null
  readonly reason: string | null
}

function shapeFor(grammars: Grammars, reading: readonly (readonly string[])[]): Refused | null {
  for (const one of grammars.refused) {
    if (parsed(one.grammar, reading).plain) return one
  }
  return null
}

function markFor(grammars: Grammars, sentence: string): Marked | null {
  const said = scanned(sentence)
  for (const one of grammars.marked) if (one.pattern.test(said)) return one
  return null
}

export function plainlyBy(grammars: Grammars, sentence: string): Said {
  const words = wordsIn(sentence)
  const mark = markFor(grammars, sentence)
  if (mark !== null) {
    return {
      plain: false,
      stoppedAt: words.length,
      words,
      stoppedOn: null,
      shape: mark.slug,
      reason: mark.reason,
    }
  }
  const reading = words.map(classesOf)
  const said = parsed(grammars.plain, reading)
  if (said.plain) {
    return { ...said, words, stoppedOn: null, shape: null, reason: null }
  }
  const one = shapeFor(grammars, reading)
  return {
    ...said,
    words,
    stoppedOn: words[said.stoppedAt] ?? null,
    shape: one?.slug ?? null,
    reason: one?.reason ?? null,
  }
}

const HELD = new WeakMap<Answering, Grammars>()

export function grammarsIn(index: Answering): Grammars {
  const found = HELD.get(index)
  if (found !== undefined) return found
  const made = grammarsFrom(shapesIn(index))
  HELD.set(index, made)
  return made
}
