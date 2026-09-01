import type { Parsed } from "../phrase-parsing/phrase-parsing.module.code.ts"
import { grammarOf, parsed } from "../phrase-parsing/phrase-parsing.module.code.ts"
import { classesOf, wordsIn } from "../word-classing/word-classing.module.code.ts"

export const START = "S"

export const PLAIN: readonly string[] = [
  "S -> NP VP",

  "NP -> NOM | DET NOM | QUANT NOM | PRON",
  "NP -> NP PP",
  "NOM -> N | ADJ NOM | N NOM | VING NOM | VEN NOM",

  "PP -> PREP NP",

  "VP -> V | V NP | V PP",
  "VP -> BE NP | BE ADJP | BE PP",
  "VP -> BE VEN | BE VEN PP",
  "VP -> BE NEG NP | BE NEG ADJP | BE NEG VEN",
  "VP -> MODAL VB | MODAL BE NP | MODAL BE ADJP | MODAL BE VEN",
  "VP -> AUX VEN | AUX VEN NP",
  "VP -> AUX NEG VB",
  "VP -> VP PP",
  "VP -> ADV VP | VP ADV",
  "VB -> V | V NP | V PP",

  "ADJP -> ADJ | ADV ADJ",
]

const GRAMMAR = grammarOf(PLAIN, START)

export type Said = Parsed & {
  readonly words: readonly string[]
  readonly stoppedOn: string | null
}

export function plainly(sentence: string): Said {
  const words = wordsIn(sentence)
  const said = parsed(GRAMMAR, words.map(classesOf))
  return {
    ...said,
    words,
    stoppedOn: said.plain ? null : (words[said.stoppedAt] ?? null),
  }
}
