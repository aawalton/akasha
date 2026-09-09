import { expect, test } from "bun:test"
import { BREAK_GLASS } from "../../../command-system/asking/asking.module.code.ts"
import {
  CONTENT_FILE,
  FILE_PATH,
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  REMOVE,
  unknownIn,
  valuesOf,
} from "./command-flags.module.code.ts"

const VALUED = [FILE_PATH, CONTENT_FILE, REMOVE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

function refusedBy(said: { readonly refusals: readonly string[] } | object): string {
  return "refusals" in said ? said.refusals.join("\n") : ""
}

test("a flag's value is the argument after that flag", () => {
  expect(valuesOf([FILE_PATH, "akasha/one.ts"], FILE_PATH, VALUED)).toEqual(["akasha/one.ts"])
})

test("a flag given twice answers with both values", () => {
  expect(valuesOf([REMOVE, "one", REMOVE, "two"], REMOVE, VALUED)).toEqual(["one", "two"])
})

test("a flag nothing follows answers with a value that is not there", () => {
  expect(valuesOf([MESSAGE], MESSAGE, VALUED)).toEqual([null])
  expect(valuesOf([], MESSAGE, VALUED)).toEqual([])
})

test("the value of one flag is not read as another flag", () => {
  expect(valuesOf([MESSAGE, REMOVE, REMOVE, "one"], REMOVE, VALUED)).toEqual(["one"])
})

test("a flag this does not take is refused rather than ignored", () => {
  expect(unknownIn(["--mechanical"], VALUED, [])).toEqual(["`--mechanical` is no flag this takes"])
})

test("a flag the caller says carries no value is taken", () => {
  expect(unknownIn(["--restated"], VALUED, ["--restated"])).toEqual([])
  expect(unknownIn([MESSAGE, "--restated"], VALUED, [])).toEqual([])
})

test("breaking the glass with no reason is refused", () => {
  expect(refusedBy(glassIn([BREAK_GLASS, "   "], VALUED))).toContain("is empty")
  expect(refusedBy(glassIn([BREAK_GLASS], VALUED))).toContain("is empty")
})

test("breaking the glass twice is refused", () => {
  expect(refusedBy(glassIn([BREAK_GLASS, "one", BREAK_GLASS, "two"], VALUED))).toContain(
    "one call bypasses once"
  )
})

test("the reason the glass was broken is answered trimmed", () => {
  expect(glassIn([BREAK_GLASS, "  held  "], VALUED)).toEqual({ glass: "held" })
})

test("a call breaking no glass is answered with no reason rather than refused", () => {
  expect(glassIn([FILE_PATH, BREAK_GLASS], VALUED)).toEqual({ glass: null })
})

test("the message and the file the message is read from are refused together", () => {
  expect(refusedBy(messageIn([MESSAGE, "held", MESSAGE_FILE, "at.txt"], VALUED))).toContain(
    "each carry the message, and both are given"
  )
})

test("a message given twice is refused", () => {
  expect(refusedBy(messageIn([MESSAGE, "one", MESSAGE, "two"], VALUED))).toContain(
    "one commit carries one message"
  )
  expect(refusedBy(messageIn([MESSAGE_FILE, "one", MESSAGE_FILE, "two"], VALUED))).toContain(
    "one commit carries one message"
  )
})

test("a message flag nothing follows is refused", () => {
  expect(refusedBy(messageIn([MESSAGE], VALUED))).toContain("and none follows it")
  expect(refusedBy(messageIn([MESSAGE_FILE], VALUED))).toContain("and none follows it")
})

test("a message that is empty is refused", () => {
  expect(refusedBy(messageIn([MESSAGE, "  "], VALUED))).toContain("a commit says what it is for")
})

test("a message is answered trimmed", () => {
  expect(messageIn([MESSAGE, "  held  "], VALUED)).toEqual({ message: "held" })
})

test("a message read from a file that will not open is refused", () => {
  expect(refusedBy(messageIn([MESSAGE_FILE, "/nowhere/at.txt"], VALUED))).toContain(
    "could not be read as text"
  )
})

test("a call naming no message is answered with none rather than refused", () => {
  expect(messageIn([FILE_PATH, MESSAGE], VALUED)).toEqual({ message: null })
})
