import { expect, test } from "bun:test"
import type { Found } from "../prose-pattern/prose-pattern.module.code.ts"
import {
  type Pattern,
  rewritesFor,
  rewritten,
  speltIn,
  wordsOf,
} from "./prose-rewrite.module.code.ts"

const HOLD: readonly Pattern[] = [
  { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
  { frame: "fronted", fromPattern: "holds", toPattern: "has" },
  { frame: "participle", fromPattern: "holding [object]", toPattern: "with [object]" },
  { frame: "placed", fromPattern: "is held in [place]", toPattern: "is in [place]" },
]

function foundAt(text: string, word: string, frame: Found["frame"]): readonly Found[] {
  const start = text.indexOf(word)
  return [{ at: 1, start, end: start + word.length, frame }]
}

function ranOn(text: string, word: string, frame: Found["frame"]): string {
  return rewritten(text, rewritesFor(text, foundAt(text, word, frame), HOLD))
}

test("a bracketed word is no part of the words a pattern matches", () => {
  expect(wordsOf("is held in [place]")).toEqual(["is", "held", "in"])
})

test("every word a passage spells is read with where it sits", () => {
  expect(speltIn("a page holds it")).toEqual([
    { word: "a", start: 0, end: 1 },
    { word: "page", start: 2, end: 6 },
    { word: "holds", start: 7, end: 12 },
    { word: "it", start: 13, end: 15 },
  ])
})

test("a word whose object comes after it takes the pair written for that frame", () => {
  expect(ranOn("A page holds a value.", "holds", "object")).toBe("A page has a value.")
})

test("a word whose object comes before it takes the pair written for that frame", () => {
  const said = ranOn("A value the page holds is read.", "holds", "fronted")
  expect(said).toBe("A value the page has is read.")
})

test("a word describing the thing before it takes the pair written for that frame", () => {
  expect(ranOn("A folder holding no file.", "holding", "participle")).toBe("A folder with no file.")
})

test("a pattern of many words takes every word of that pattern away", () => {
  const said = ranOn("A value is held in a file.", "held", "placed")
  expect(said).toBe("A value is in a file.")
})

test("a frame no pair names is left as it was written", () => {
  const patterns: readonly Pattern[] = [
    { frame: "object", fromPattern: "holds [object]", toPattern: "has [object]" },
  ]
  const text = "A value the page holds is read."
  expect(rewritesFor(text, foundAt(text, "holds", "fronted"), patterns)).toEqual([])
})

test("a spelling the pair written for that frame does not name is left alone", () => {
  const text = "A page held a value."
  expect(rewritesFor(text, foundAt(text, "held", "object"), HOLD)).toEqual([])
})

test("two words in one passage are each rewritten", () => {
  const text = "A page holds a value and a folder holds a file."
  const first = text.indexOf("holds")
  const second = text.indexOf("holds", first + 1)
  const found: readonly Found[] = [
    { at: 1, start: first, end: first + 5, frame: "object" },
    { at: 2, start: second, end: second + 5, frame: "object" },
  ]
  expect(rewritten(text, rewritesFor(text, found, HOLD))).toBe(
    "A page has a value and a folder has a file."
  )
})

test("a passage no word is found in is handed back as it was", () => {
  expect(rewritten("A page has a value.", [])).toBe("A page has a value.")
})
