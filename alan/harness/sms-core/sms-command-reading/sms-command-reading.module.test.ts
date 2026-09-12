import { describe, expect, test } from "bun:test"
import {
  JSON_SAID,
  wordsIn,
} from "akasha/alan/harness/sms-core/sms-command-reading/sms-command-reading.module.code.ts"

const TEXT = { said: "--text", file: "--text-file" }

const VALUED = ["--to", TEXT.said, TEXT.file]

const SWITCHES = [JSON_SAID]

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
