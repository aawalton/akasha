import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { loneDeterminer } from "./lone-determiner.sentence-shape.code.ts"

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

test("a demonstrative filling the subject slot is found", () => {
  const said = sentenceOf([
    ["This", "PRON", 3, "nsubj"],
    ["is", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(loneDeterminer(said)).toEqual([{ at: [1] }])
})

test("a demonstrative filling the object slot is found", () => {
  const said = sentenceOf([
    ["akasha", "PROPN", 2, "nsubj"],
    ["refuses", "VERB", 0, "root"],
    ["those", "PRON", 2, "obj"],
  ])
  expect(loneDeterminer(said)).toEqual([{ at: [3] }])
})

test("a demonstrative before a noun is passed over", () => {
  const said = sentenceOf([
    ["this", "DET", 2, "det"],
    ["page", "NOUN", 0, "root"],
  ])
  expect(loneDeterminer(said)).toEqual([])
})

test("a that opening a complement clause is passed over", () => {
  const said = sentenceOf([
    ["akasha", "PROPN", 2, "nsubj"],
    ["says", "VERB", 0, "root"],
    ["that", "SCONJ", 5, "mark"],
    ["pages", "NOUN", 5, "nsubj"],
    ["land", "VERB", 2, "ccomp"],
  ])
  expect(loneDeterminer(said)).toEqual([])
})

test("a relative that is passed over", () => {
  const said = sentenceOf([
    ["page", "NOUN", 0, "root"],
    ["that", "PRON", 3, "nsubj"],
    ["lands", "VERB", 1, "acl:relcl"],
  ])
  expect(loneDeterminer(said)).toEqual([])
})

test("a relative that is passed over whatever its clause is labelled", () => {
  const said = sentenceOf([
    ["thing", "NOUN", 0, "root"],
    ["that", "PRON", 3, "nsubj"],
    ["renews", "VERB", 1, "advcl:relcl"],
  ])
  expect(loneDeterminer(said)).toEqual([])
})

test("a that led by a conjunction points at what came before and is found", () => {
  const said = sentenceOf([
    ["whether", "SCONJ", 4, "mark"],
    ["that", "PRON", 4, "nsubj"],
    ["is", "AUX", 4, "cop"],
    ["safe", "ADJ", 0, "root"],
  ])
  expect(loneDeterminer(said)).toEqual([{ at: [2] }])
})
