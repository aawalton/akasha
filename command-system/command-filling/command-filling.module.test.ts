import { expect, test } from "bun:test"
import { filing, wordFilling } from "./command-filling.module.code.ts"

const WANTS = "what to send"

const TO = "--to"

test("a filing names the flag and the file flag beside it", () => {
  expect(filing("--text")).toEqual({ said: "--text", file: "--text-file" })
})

test("a bare word fills the flag nothing said", () => {
  expect(wordFilling({ named: {}, loose: ["one"] }, TO, WANTS)).toBe("one")
})

test("a flag said fills where no word was said", () => {
  expect(wordFilling({ named: { [TO]: "one" }, loose: [] }, TO, WANTS)).toBe("one")
})

test("nothing said fills nothing", () => {
  expect(wordFilling({ named: {}, loose: [] }, TO, WANTS)).toBeUndefined()
})

test("a flag and a word together are refused", () => {
  expect(wordFilling({ named: { [TO]: "one" }, loose: ["two"] }, TO, WANTS)).toEqual({
    refused: [`${WANTS} is said at \`${TO}\` and as a word, and one way at a time is the way`],
  })
})

test("a second bare word is refused", () => {
  expect(wordFilling({ named: {}, loose: ["one", "two"] }, TO, WANTS)).toEqual({
    refused: [`this names ${WANTS} once, and \`two\` followed the one it named`],
  })
})
