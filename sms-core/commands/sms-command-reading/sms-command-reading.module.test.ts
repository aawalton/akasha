import { describe, expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import {
  filing,
  JSON_SAID,
  proseIn,
  wordFilling,
  wordsIn,
} from "./sms-command-reading.module.code.ts"

const TEXT = filing("--text")

const VALUED = ["--to", TEXT.said, TEXT.file]

const SWITCHES = [JSON_SAID]

const GIVEN: Given = {
  root: "/",
  calledAs: "sms send",
  from: "/",
  writer: null,
  agentId: null,
}

function said(argv: readonly string[]) {
  const read = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  return read
}

describe("wordsIn", () => {
  test("reads a value, a switch and a loose word", () => {
    const read = said(["--to", "+18015551234", JSON_SAID, "+18015550000"])
    expect(read.named["--to"]).toBe("+18015551234")
    expect(read.flags.has(JSON_SAID)).toBe(true)
    expect(read.loose).toEqual(["+18015550000"])
  })

  test("refuses a flag it does not take", () => {
    expect("refused" in wordsIn(["--nope"], VALUED, SWITCHES)).toBe(true)
  })

  test("refuses a flag whose value is another flag it takes", () => {
    expect("refused" in wordsIn(["--to", TEXT.said], VALUED, SWITCHES)).toBe(true)
  })
})

describe("wordFilling", () => {
  test("takes the loose word where the flag is unsaid", () => {
    expect(wordFilling(said(["+18015551234"]), "--to", "who it goes to")).toBe("+18015551234")
  })

  test("refuses the same thing said both ways", () => {
    const read = said(["--to", "+1801", "+1802"])
    expect("refused" in Object(wordFilling(read, "--to", "who it goes to"))).toBe(true)
  })
})

describe("proseIn", () => {
  test("takes the body said at its flag", () => {
    expect(proseIn(GIVEN, said([TEXT.said, "hello"]), TEXT)).toEqual({ text: "hello" })
  })

  test("answers nothing where neither way was said", () => {
    expect(proseIn(GIVEN, said([]), TEXT)).toEqual({ text: undefined })
  })

  test("refuses the body said both ways", () => {
    const read = said([TEXT.said, "hello", TEXT.file, "./body.md"])
    expect("refused" in proseIn(GIVEN, read, TEXT)).toBe(true)
  })

  test("refuses a file that will not open", () => {
    const read = said([TEXT.file, "/nowhere/at/all/body.md"])
    expect("refused" in proseIn(GIVEN, read, TEXT)).toBe(true)
  })
})
