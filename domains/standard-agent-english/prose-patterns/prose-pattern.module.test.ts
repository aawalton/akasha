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

const HELD = new Set(["held"])

test("a word a person is the holder of is left alone", () => {
  const said = sentenceOf([
    ["how", "ADV", 3, "advmod"],
    ["I", "PRON", 3, "nsubj"],
    ["hold", "VERB", 0, "root"],
    ["it", "PRON", 3, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word an unknown is the holder of is left alone", () => {
  const said = sentenceOf([
    ["what", "PRON", 2, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["it", "PRON", 2, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word a thing is the holder of is found", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["notes", "NOUN", 3, "nsubj"],
    ["hold", "VERB", 0, "root"],
    ["no", "DET", 5, "det"],
    ["queue", "NOUN", 3, "obj"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["object"])
})

test("a word whose only subject is the relativizer has no object anywhere", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["set", "NOUN", 4, "obl"],
    ["that", "PRON", 4, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word taking a bare adverb for a particle is left alone", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["spend", "NOUN", 4, "obl"],
    ["I", "PRON", 4, "nsubj"],
    ["hold", "VERB", 2, "acl:relcl"],
    ["under", "ADV", 4, "advmod"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a particle right after a word is a particle the parser called a preposition", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["notes", "NOUN", 0, "root"],
    ["the", "DET", 4, "det"],
    ["book", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["through", "ADP", 8, "case"],
    ["a", "DET", 8, "det"],
    ["string", "NOUN", 5, "obl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a particle the parser hung on a word's object is that word's particle", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["proxy", "NOUN", 0, "root"],
    ["that", "PRON", 4, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["traffic", "NOUN", 4, "obj"],
    ["out", "ADP", 5, "advmod"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

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

test("a word whose object the parser hung a `to` phrase on is left alone", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["forwarder", "NOUN", 0, "root"],
    ["that", "PRON", 4, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["a", "DET", 6, "det"],
    ["request", "NOUN", 4, "obj"],
    ["to", "ADP", 9, "case"],
    ["the", "DET", 9, "det"],
    ["workstation", "NOUN", 6, "nmod"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word in the passive that puts a thing somewhere is found", () => {
  const said = sentenceOf([
    ["Prose", "NOUN", 3, "nsubj:pass"],
    ["is", "AUX", 3, "aux:pass"],
    ["held", "VERB", 0, "root"],
    ["in", "ADP", 5, "case"],
    ["file", "NOUN", 3, "obl"],
  ])

  expect(foundIn(said, HELD).map((one) => one.frame)).toEqual(["placed"])
})

test("a word in the passive bound by `to` is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["tree", "NOUN", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["held", "VERB", 0, "root"],
    ["to", "ADP", 6, "case"],
    ["release", "NOUN", 4, "obl"],
  ])

  expect(foundIn(said, HELD)).toEqual([])
})

test("a word in the passive that puts a thing nowhere is left alone", () => {
  const said = sentenceOf([
    ["Each", "DET", 2, "det"],
    ["format", "NOUN", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["held", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HELD)).toEqual([])
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

test("a word after a preposition names an act rather than describing a thing", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["cost", "NOUN", 0, "root"],
    ["of", "SCONJ", 4, "mark"],
    ["holding", "VERB", 2, "acl"],
    ["stress", "NOUN", 4, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word a past participle comes right after is left alone", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["pounds", "NOUN", 0, "root"],
    ["the", "DET", 4, "det"],
    ["day", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["turned", "VERB", 2, "acl"],
    ["into", "ADP", 8, "case"],
    ["points", "NOUN", 6, "obl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word another verb comes right after is found", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["pounds", "NOUN", 6, "nsubj"],
    ["the", "DET", 4, "det"],
    ["day", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["differ", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word whose object comes before it as a pronoun is left alone", () => {
  const said = sentenceOf([
    ["past", "ADP", 2, "case"],
    ["what", "PRON", 0, "root"],
    ["it", "PRON", 4, "nsubj"],
    ["hold", "VERB", 2, "acl:relcl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word a form of `have` comes right after is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["value", "NOUN", 6, "nsubj"],
    ["no", "DET", 4, "det"],
    ["page", "NOUN", 5, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["has", "VERB", 0, "root"],
    ["no", "DET", 8, "det"],
    ["file", "NOUN", 6, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word the parser gave a form of `have` for an auxiliary is left alone", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["edition", "NOUN", 5, "nsubj"],
    ["Alan", "PROPN", 5, "nsubj"],
    ["has", "AUX", 5, "aux"],
    ["holds", "VERB", 0, "root"],
    ["that", "DET", 7, "det"],
    ["reading", "NOUN", 5, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word set against another word by `rather than` is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["refusal", "NOUN", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["held", "VERB", 0, "root"],
    ["in", "ADP", 6, "case"],
    ["plan", "NOUN", 4, "obl"],
    ["rather", "ADV", 8, "cc"],
    ["dropped", "VERB", 4, "conj"],
  ])

  expect(foundIn(said, HELD)).toEqual([])
})

test("a preposition the parser hung on a word as an adverb strands that word", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["push", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["the", "DET", 5, "det"],
    ["branch", "NOUN", 3, "obj"],
    ["each", "DET", 7, "det"],
    ["repository", "NOUN", 3, "nsubj"],
    ["is", "AUX", 9, "cop"],
    ["on", "ADP", 3, "advmod"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word whose object is a self is left alone", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["ask", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["itself", "PRON", 3, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word whose object a preposition hangs off sends that object on", () => {
  const said = sentenceOf([
    ["the", "DET", 2, "det"],
    ["watcher", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["what", "PRON", 3, "obj"],
    ["to", "ADP", 4, "case"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word a directed preposition follows the object of sends that object on", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["code", "NOUN", 0, "root"],
    ["holding", "VERB", 2, "acl"],
    ["a", "DET", 5, "det"],
    ["module", "NOUN", 3, "obj"],
    ["to", "ADP", 7, "case"],
    ["runtime", "NOUN", 8, "compound"],
    ["states", "NOUN", 2, "nmod"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a participle an adverb comes before is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["name", "NOUN", 7, "nsubj:pass"],
    ["already", "ADV", 4, "advmod"],
    ["holding", "VERB", 2, "acl"],
    ["text", "NOUN", 4, "obj"],
    ["is", "AUX", 7, "aux:pass"],
    ["left", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a participle beside another clause on the same word is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["push", "NOUN", 4, "nsubj:pass"],
    ["is", "AUX", 4, "aux:pass"],
    ["given", "VERB", 0, "root"],
    ["the", "DET", 6, "det"],
    ["time", "NOUN", 4, "obj"],
    ["holding", "VERB", 6, "acl"],
    ["objects", "NOUN", 7, "obj"],
    ["takes", "VERB", 6, "acl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a participle joined to another word is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["day", "NOUN", 0, "root"],
    ["holding", "VERB", 2, "acl"],
    ["rows", "NOUN", 3, "obj"],
    ["and", "CCONJ", 6, "cc"],
    ["declaring", "VERB", 3, "conj"],
    ["no", "DET", 8, "det"],
    ["stretches", "NOUN", 6, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word with no object that places a thing somewhere is left alone", () => {
  const said = sentenceOf([
    ["An", "DET", 2, "det"],
    ["object", "NOUN", 0, "root"],
    ["the", "DET", 5, "det"],
    ["list", "NOUN", 5, "compound"],
    ["names", "NOUN", 6, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["in", "ADP", 8, "case"],
    ["objects", "NOUN", 6, "obl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word the parser read as a noun heading a relative clause is found", () => {
  const said = sentenceOf([
    ["The", "DET", 2, "det"],
    ["flags", "NOUN", 7, "nsubj:pass"],
    ["a", "DET", 5, "det"],
    ["call", "NOUN", 5, "compound"],
    ["holds", "NOUN", 2, "acl:relcl"],
    ["are", "AUX", 7, "aux:pass"],
    ["judged", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a thing right before a word with no subject of its own is that word's subject", () => {
  const said = sentenceOf([
    ["An", "DET", 2, "det"],
    ["id", "NOUN", 7, "nsubj"],
    ["no", "DET", 5, "det"],
    ["buy", "NOUN", 5, "compound"],
    ["rule", "NOUN", 2, "appos"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["refuses", "VERB", 0, "root"],
  ])

  expect(foundIn(said, HOLD).map((one) => one.frame)).toEqual(["fronted"])
})

test("a word whose object is a question is left alone", () => {
  const said = sentenceOf([
    ["A", "DET", 2, "det"],
    ["widget", "NOUN", 3, "nsubj"],
    ["holds", "VERB", 0, "root"],
    ["how", "ADV", 5, "advmod"],
    ["many", "ADJ", 6, "amod"],
    ["taps", "NOUN", 3, "obj"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})

test("a word the parser gave two objects is left alone", () => {
  const said = sentenceOf([
    ["An", "DET", 3, "det"],
    ["effect", "NOUN", 3, "compound"],
    ["row", "NOUN", 4, "nsubj"],
    ["held", "VERB", 0, "root"],
    ["whole", "ADJ", 6, "amod"],
    ["drops", "NOUN", 4, "obj"],
    ["the", "DET", 8, "det"],
    ["id", "NOUN", 4, "obj"],
  ])

  expect(foundIn(said, HELD)).toEqual([])
})

test("a word bound to something by a directed preposition is left alone", () => {
  const said = sentenceOf([
    ["a", "DET", 2, "det"],
    ["record", "NOUN", 0, "root"],
    ["that", "PRON", 4, "nsubj"],
    ["holds", "VERB", 2, "acl:relcl"],
    ["between", "ADP", 6, "case"],
    ["rounds", "NOUN", 4, "obl"],
  ])

  expect(foundIn(said, HOLD)).toEqual([])
})
