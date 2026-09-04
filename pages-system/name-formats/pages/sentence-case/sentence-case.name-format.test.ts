import { expect, test } from "bun:test"
import { sentenceCase } from "./sentence-case.name-format.code.ts"

test("an opening capital with the rest lower is written in it", () => {
  expect(sentenceCase("Name")).toBe(true)
  expect(sentenceCase("The words of a name")).toBe(true)
})

test("a word after the first opening capital is let through, being perhaps a proper noun", () => {
  expect(sentenceCase("The words of Alan")).toBe(true)
})

test("an opening lower letter is refused", () => {
  expect(sentenceCase("the words of a name")).toBe(false)
})

test("one space parts two words, and nothing pads the name", () => {
  expect(sentenceCase("")).toBe(false)
  expect(sentenceCase("The  words")).toBe(false)
  expect(sentenceCase(" The words")).toBe(false)
  expect(sentenceCase("The words ")).toBe(false)
})
