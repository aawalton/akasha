import { expect, test } from "bun:test"
import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { foundIn } from "./prose-pattern.module.code.ts"

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

const HOLD = new Set(["hold", "holds", "holding"])

test("a word with an object of its own is found", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["ledger", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["the", "DET", 5, "det"],
    ["edits", "NOUN", 3, "obj"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["object"])
})

test("a word whose object comes before it is found", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["page", "NOUN", 0, "root"],
    ["the", "DET", 4, "det"],
    ["seat", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word with no object at all is left alone", () => {
  const said = sentenceOf([
    ["Every", "DET", 2, "det"],
    ["group", "NOUN", 3, "nsubj"],
    ["hold", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word read as a noun is left alone", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["hold", "NOUN", 3, "nsubj"],
    ["sits", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word taking a particle is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["timer", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["the", "DET", 5, "det"],
    ["process", "NOUN", 3, "obj"],
    ["up", "ADP", 3, "compound:prt"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word bound to something by `to` and with no object is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["shape", "NOUN", 0, "root"],
    ["the", "DET", 4, "det"],
    ["caller", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["to", "ADP", 8, "case"],
    ["a", "DET", 8, "det"],
    ["ceiling", "NOUN", 5, "obl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a participle with an object is found as a participle", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["folder", "NOUN", 0, "root"],
    ["holding", "VERB", 2, "acl"],
    ["no", "DET", 5, "det"],
    ["file", "NOUN", 3, "obj"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["participle"])
})
