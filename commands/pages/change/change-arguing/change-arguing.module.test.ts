import { expect, test } from "bun:test"
import {
  helpIn,
  wordlessIn,
} from "akasha/commands/pages/change/change-arguing/change-arguing.module.code.ts"

test("a call naming no word is left with nothing to refuse", () => {
  expect(wordlessIn([], "list")).toBe(null)
})

test("a call naming one bare word is refused, and the refusal names that word", () => {
  expect(wordlessIn(["aine-ababa9eca727720c2"], "list")).toBe(
    "a list takes no word, and this call named `aine-ababa9eca727720c2`"
  )
})

test("a call naming two words is refused by the first of them", () => {
  expect(wordlessIn(["one", "two"], "drop")).toBe("a drop takes no word, and this call named `one`")
})

test("a long flag is refused as a flag rather than as a word", () => {
  expect(wordlessIn(["--all"], "drop")).toBe("a drop takes no flag, and this call named `--all`")
})

test("a short flag is refused as a flag too", () => {
  expect(wordlessIn(["-a"], "list")).toBe("a list takes no flag, and this call named `-a`")
})

test("the help flag is answered with the call and the lines handed in", () => {
  expect(helpIn(["--help"], "a call", ["what it is for"])).toEqual(["a call", "", "what it is for"])
})

test("the short spelling of the help flag is answered too", () => {
  expect(helpIn(["-h"], "a call", [])).toEqual(["a call", ""])
})

test("a call naming no help flag first is left for the rest of the command", () => {
  expect(helpIn([], "a call", [])).toBe(null)
  expect(helpIn(["one", "--help"], "a call", [])).toBe(null)
})
