import { expect, test } from "bun:test"
import type { DepSentence, DepToken } from "../dependency-graph/dependency-graph.module.code.ts"
import { makeSentence } from "../dependency-graph/dependency-graph.module.code.ts"
import { doubtsIn, isSound } from "./parse-doubt.module.code.ts"

function word(id: number, form: string, upos: string, head: number, deprel: string): DepToken {
  return { id, form, upos, head, deprel, start: 0, end: form.length }
}

function parsed(tokens: readonly DepToken[]): DepSentence {
  return makeSentence({ text: "", start: 0, end: 0, tokens: [...tokens] })
}

test("a root carrying a subject is sound", () => {
  const said = parsed([
    word(1, "A", "DET", 2, "det"),
    word(2, "page", "NOUN", 5, "nsubj"),
    word(3, "is", "AUX", 5, "cop"),
    word(4, "a", "DET", 5, "det"),
    word(5, "file", "NOUN", 0, "root"),
  ])
  expect(doubtsIn(said)).toEqual([])
  expect(isSound(said)).toBe(true)
})

test("a root carrying no subject is doubted", () => {
  const said = parsed([
    word(1, "file", "NOUN", 0, "root"),
    word(2, "that", "PRON", 3, "nsubj"),
    word(3, "decrypt", "VERB", 1, "acl:relcl"),
  ])
  expect(doubtsIn(said)).toEqual(["the root `file` carries no subject"])
  expect(isSound(said)).toBe(false)
})

test("a subject reached through a relation family is a subject", () => {
  const said = parsed([
    word(1, "page", "NOUN", 2, "nsubj:pass"),
    word(2, "deleted", "VERB", 0, "root"),
  ])
  expect(doubtsIn(said)).toEqual([])
})

test("a clausal subject is a subject", () => {
  const said = parsed([
    word(1, "Leaving", "VERB", 3, "csubj"),
    word(2, "is", "AUX", 3, "cop"),
    word(3, "written", "VERB", 0, "root"),
  ])
  expect(doubtsIn(said)).toEqual([])
})

test("a parse naming no root is doubted", () => {
  const said = parsed([word(1, "a", "DET", 2, "det"), word(2, "page", "NOUN", 1, "nmod")])
  expect(doubtsIn(said)).toEqual(["the parse names no root"])
})
