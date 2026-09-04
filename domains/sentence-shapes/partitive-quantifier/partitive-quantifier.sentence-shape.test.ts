import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { partitiveQuantifier } from "./partitive-quantifier.sentence-shape.code.ts"

type Row = readonly [string, string, number, string]

function sentenceOf(rows: readonly Row[]): DepSentence {
  let at = 0
  const tokens = rows.map(([form, upos, head, deprel], index) => {
    const start = at
    at += form.length + 1
    return { id: index + 1, form, upos, head, deprel, start, end: start + form.length }
  })
  return makeSentence({
    text: rows.map((row) => row[0]).join(" "),
    start: 0,
    end: at,
    tokens,
  })
}

test("a quantifier naming what it is part of is found", () => {
  const said = sentenceOf([
    ["Some", "PRON", 6, "nsubj"],
    ["of", "ADP", 4, "case"],
    ["the", "DET", 4, "det"],
    ["pages", "NOUN", 1, "nmod"],
    ["are", "AUX", 6, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(partitiveQuantifier(said)).toEqual([{ at: [1, 4] }])
})

test("a quantifier with no phrase after it is passed over", () => {
  const said = sentenceOf([
    ["Many", "PRON", 3, "nsubj"],
    ["are", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(partitiveQuantifier(said)).toEqual([])
})

test("a quantifier before a noun is passed over", () => {
  const said = sentenceOf([
    ["many", "DET", 2, "det"],
    ["pages", "NOUN", 0, "root"],
  ])
  expect(partitiveQuantifier(said)).toEqual([])
})

test("a noun followed by an of phrase is passed over", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["half", "NOUN", 5, "nsubj"],
    ["of", "ADP", 4, "case"],
    ["pages", "NOUN", 2, "nmod"],
    ["landed", "VERB", 0, "root"],
  ])
  expect(partitiveQuantifier(said)).toEqual([])
})
