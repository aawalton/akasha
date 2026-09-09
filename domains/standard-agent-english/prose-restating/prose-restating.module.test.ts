import { expect, test } from "bun:test"
import type { DepSentence } from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import { makeSentence } from "akasha/domains/plain-language/dependency-graph/dependency-graph.module.code.ts"
import type { Pattern } from "../prose-rewrite/prose-rewrite.module.code.ts"
import { type Passage, restatedIn } from "./prose-restating.module.code.ts"

type Row = readonly [string, string, number, string]

function sentenceOf(rows: readonly Row[]): DepSentence {
  let at = 0
  const tokens = rows.map(([form, upos, head, deprel], index) => {
    const start = at
    at += form.length + 1
    return { id: index + 1, form, upos, head, deprel, start, end: start + form.length }
  })
  return makeSentence({ text: rows.map((row) => row[0]).join(" "), start: 0, end: at, tokens })
}

const HELD = sentenceOf([
  ["A", "DET", 2, "det"],
  ["page", "NOUN", 3, "nsubj"],
  ["holds", "VERB", 0, "root"],
  ["a", "DET", 5, "det"],
  ["value", "NOUN", 3, "obj"],
])

const SPELLINGS = new Set(["hold", "holds", "holding"])

const PATTERNS: readonly Pattern[] = [
  { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
]

function passageOf(text: string): Passage {
  return { path: "held/one.page-type.ts", key: "definition", under: [], text }
}

function parsingOf(sentences: readonly DepSentence[]) {
  return async (): Promise<readonly DepSentence[]> => sentences
}

test("a passage a pair rewrites is answered with the words it now states", async () => {
  const passage = passageOf("A page holds a value")
  const said = await restatedIn([passage], SPELLINGS, PATTERNS, parsingOf([HELD]))
  expect(said).toEqual([{ passage, now: "A page has a value" }])
})

test("a passage no word is found in is answered with nothing", async () => {
  const passage = passageOf("A page has a value")
  const said = await restatedIn([passage], SPELLINGS, PATTERNS, parsingOf([]))
  expect(said).toEqual([])
})

test("a passage no pair rewrites is answered with nothing", async () => {
  const passage = passageOf("A page holds a value")
  const said = await restatedIn([passage], SPELLINGS, [], parsingOf([HELD]))
  expect(said).toEqual([])
})

test("the passage answered is the one handed in", async () => {
  const passage = passageOf("A page holds a value")
  const said = await restatedIn([passage], SPELLINGS, PATTERNS, parsingOf([HELD]))
  expect(said[0]?.passage.path).toBe("held/one.page-type.ts")
})

test("every passage handed in is read", async () => {
  const one = passageOf("A page holds a value")
  const two = passageOf("A page holds a value")
  const said = await restatedIn([one, two], SPELLINGS, PATTERNS, parsingOf([HELD]))
  expect(said.length).toBe(2)
})
