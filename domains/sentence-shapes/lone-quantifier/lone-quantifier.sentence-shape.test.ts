import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { loneQuantifier } from "./lone-quantifier.sentence-shape.code.ts"

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

test("a quantifier filling the subject slot is found", () => {
  const said = sentenceOf([
    ["Many", "PRON", 3, "nsubj"],
    ["are", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(loneQuantifier(said)).toEqual([{ at: [1] }])
})

test("a quantifier before a noun is passed over", () => {
  const said = sentenceOf([
    ["many", "DET", 2, "det"],
    ["pages", "NOUN", 0, "root"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("one by one is passed over", () => {
  const said = sentenceOf([
    ["Pages", "NOUN", 2, "nsubj"],
    ["land", "VERB", 0, "root"],
    ["one", "NUM", 2, "obl"],
    ["by", "ADP", 5, "case"],
    ["one", "NUM", 3, "nmod"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("a quantifier naming what it is part of is left to the partitive shape", () => {
  const said = sentenceOf([
    ["Some", "PRON", 6, "nsubj"],
    ["of", "ADP", 4, "case"],
    ["the", "DET", 4, "det"],
    ["pages", "NOUN", 1, "nmod"],
    ["are", "AUX", 6, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("a counted noun phrase holds no match", () => {
  const said = sentenceOf([
    ["one", "NUM", 2, "nummod"],
    ["page", "NOUN", 0, "root"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("at all marks a degree and is passed over", () => {
  const said = sentenceOf([
    ["Nothing", "PRON", 2, "nsubj"],
    ["waits", "VERB", 0, "root"],
    ["at", "ADP", 4, "case"],
    ["all", "DET", 2, "obl"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("at most marks a degree and is passed over", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["batch", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["ten", "NUM", 5, "nummod"],
    ["files", "NOUN", 3, "obj"],
    ["at", "ADP", 7, "case"],
    ["most", "ADJ", 3, "obl"],
  ])
  expect(loneQuantifier(said)).toEqual([])
})

test("most naming what it counts is found", () => {
  const said = sentenceOf([
    ["Most", "ADJ", 3, "nsubj"],
    ["are", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(loneQuantifier(said)).toEqual([{ at: [1] }])
})
