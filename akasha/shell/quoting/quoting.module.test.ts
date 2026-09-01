import { expect, test } from "bun:test"
import { said } from "@akasha/utils-run/running"
import { quoted } from "./quoting.module.code.ts"

const TRICKY: readonly string[] = [
  "",
  "plain",
  "it's",
  "$HOME",
  "a b",
  "semi;colon",
  "*",
  "`whoami`",
  "back\\slash",
  "two\nlines",
  "'",
  "''",
  '"double"',
  "$(echo run)",
]

test("a value is wrapped in single quotes", () => {
  expect(quoted("plain")).toBe("'plain'")
})

test("a single quote inside the value closes, escapes itself and opens again", () => {
  expect(quoted("it's")).toBe("'it'\\''s'")
})

test("what the shell expands is left for the shell to read as text", () => {
  expect(quoted("$HOME")).toBe("'$HOME'")
})

test("an empty value is answered as a pair of quotes", () => {
  expect(quoted("")).toBe("''")
})

test("a shell reads back every tricky value exactly as it was given", () => {
  for (const one of TRICKY) {
    const back = said(["sh", "-c", `printf %s ${quoted(one)}`])
    expect(back).toBe(one)
  }
})

test("a shell reads a quoted value as one word however many spaces it holds", () => {
  const back = said(["sh", "-c", `set -- ${quoted("a b c")}; printf %s "$#"`])
  expect(back).toBe("1")
})
