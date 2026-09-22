import { expect, test } from "bun:test"
import { parseSaidText } from "akasha/code/type/narrowing/modules/parse-said-text/parse-said-text.module.code.ts"

test("a value holding a word holds that word", () => {
  expect(parseSaidText("held")).toBe("held")
})

test("a value holding the empty string holds no text", () => {
  expect(parseSaidText("")).toBeUndefined()
})

test("a value holding nothing holds no text", () => {
  expect(parseSaidText(undefined)).toBeUndefined()
})

test("a value holding only spaces holds those spaces, because nothing here trims", () => {
  expect(parseSaidText(" ")).toBe(" ")
})
