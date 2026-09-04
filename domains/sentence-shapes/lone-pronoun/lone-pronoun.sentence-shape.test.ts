import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { lonePronoun } from "./lone-pronoun.sentence-shape.code.ts"

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

test("a pronoun filling the subject slot is found", () => {
  const said = sentenceOf([
    ["It", "PRON", 3, "nsubj:pass"],
    ["is", "AUX", 3, "aux:pass"],
    ["refused", "VERB", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([{ at: [1] }])
})

test("a pronoun filling the object slot is found", () => {
  const said = sentenceOf([
    ["akasha", "PROPN", 2, "nsubj"],
    ["deletes", "VERB", 0, "root"],
    ["them", "PRON", 2, "obj"],
  ])
  expect(lonePronoun(said)).toEqual([{ at: [3] }])
})

test("a relative pronoun opening a clause is passed over", () => {
  const said = sentenceOf([
    ["page", "NOUN", 0, "root"],
    ["that", "PRON", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["deleted", "VERB", 1, "acl:relcl"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("a relative pronoun spelled which is passed over", () => {
  const said = sentenceOf([
    ["page", "NOUN", 0, "root"],
    ["which", "PRON", 3, "nsubj"],
    ["lands", "VERB", 1, "acl:relcl"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("a possessive pronoun before a noun is passed over", () => {
  const said = sentenceOf([
    ["its", "PRON", 2, "nmod:poss"],
    ["page", "NOUN", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("an expletive is passed over", () => {
  const said = sentenceOf([
    ["It", "PRON", 2, "expl"],
    ["lands", "VERB", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("a demonstrative is left to the lone determiner shape", () => {
  const said = sentenceOf([
    ["This", "PRON", 3, "nsubj"],
    ["is", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("a quantifier is left to the lone quantifier shape", () => {
  const said = sentenceOf([
    ["Many", "PRON", 3, "nsubj"],
    ["are", "AUX", 3, "cop"],
    ["refused", "ADJ", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([])
})

test("a sentence naming the thing holds no match", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["page", "NOUN", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["deleted", "VERB", 0, "root"],
  ])
  expect(lonePronoun(said)).toEqual([])
})
