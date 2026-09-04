import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { closingCount } from "./closing-count.sentence-shape.code.ts"

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

test("a count closing a sentence over the list it gave is found", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["kind", "NOUN", 4, "nsubj"],
    ["is", "AUX", 4, "cop"],
    ["authored", "VERB", 0, "root"],
    ["or", "CCONJ", 6, "cc"],
    ["serialized", "VERB", 4, "conj"],
    ["and", "CCONJ", 9, "cc"],
    ["never", "ADV", 9, "advmod"],
    ["both", "PRON", 4, "conj"],
    [".", "PUNCT", 4, "punct"],
  ])
  expect(closingCount(said)).toEqual([{ at: [9] }])
})

test("a count coordinated with what it sums is found", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["stop", "NOUN", 3, "nsubj"],
    ["names", "VERB", 0, "root"],
    ["every", "DET", 5, "det"],
    ["server", "NOUN", 3, "obj"],
    ["never", "ADV", 7, "advmod"],
    ["both", "CCONJ", 5, "conj"],
    [".", "PUNCT", 3, "punct"],
  ])
  expect(closingCount(said)).toEqual([{ at: [7] }])
})

test("a count anywhere but the close is passed over", () => {
  const said = sentenceOf([
    ["Both", "PRON", 3, "nsubj"],
    ["are", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(closingCount(said)).toEqual([])
})

test("an `either` saying also not counts nothing and is passed over", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["specifier", "NOUN", 3, "nsubj"],
    ["makes", "VERB", 0, "root"],
    ["none", "PRON", 3, "obj"],
    ["either", "ADV", 3, "advmod"],
    [".", "PUNCT", 3, "punct"],
  ])
  expect(closingCount(said)).toEqual([])
})

test("a count carrying a noun of its own is passed over", () => {
  const said = sentenceOf([
    ["A", "DET", 3, "det"],
    ["pool", "NOUN", 3, "compound"],
    ["service", "NOUN", 5, "nsubj"],
    ["is", "AUX", 5, "cop"],
    ["neither", "PRON", 0, "root"],
    [".", "PUNCT", 5, "punct"],
  ])
  expect(closingCount(said)).toEqual([])
})

test("a word that sums nothing is passed over though a list comes before it", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["rule", "NOUN", 3, "nsubj"],
    ["reads", "VERB", 0, "root"],
    ["markup", "NOUN", 3, "obj"],
    ["and", "CCONJ", 6, "cc"],
    ["lua", "NOUN", 4, "conj"],
    [".", "PUNCT", 3, "punct"],
  ])
  expect(closingCount(said)).toEqual([])
})
