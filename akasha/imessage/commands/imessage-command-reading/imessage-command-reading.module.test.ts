import { describe, expect, test } from "bun:test"
import type { ImessageMessage } from "../../chat-db/chat-db.module.code.ts"
import {
  countOf,
  JSON_SAID,
  LIMIT_ALSO,
  LIMIT_SAID,
  messageLines,
  namingIn,
  wordFilling,
  wordsIn,
} from "./imessage-command-reading.module.code.ts"

const VALUED = [LIMIT_SAID, "--contact"]

const SWITCHES = [JSON_SAID]

function said(argv: readonly string[]) {
  const read = wordsIn(argv, VALUED, SWITCHES, LIMIT_ALSO)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  return read
}

function message(over: Partial<ImessageMessage>): ImessageMessage {
  return {
    rowid: 1,
    guid: "g",
    text: "hi",
    isFromMe: false,
    unixSeconds: 0,
    handleId: null,
    chatIdentifier: null,
    chatDisplayName: null,
    ...over,
  }
}

describe("wordsIn", () => {
  test("reads a value, a switch and a loose word", () => {
    const read = said(["--contact", "mary", JSON_SAID, "sleep"])
    expect(read.named["--contact"]).toBe("mary")
    expect(read.flags.has(JSON_SAID)).toBe(true)
    expect(read.loose).toEqual(["sleep"])
  })

  test("carries an alias to the flag it stands for", () => {
    expect(said(["--tail", "5"]).named[LIMIT_SAID]).toBe("5")
  })

  test("refuses a flag it does not take", () => {
    expect(wordsIn(["--nope"], VALUED, SWITCHES)).toEqual({
      refused: ["`--nope` is no flag this takes — it takes `--limit`, `--contact`, `--json`"],
    })
  })

  test("refuses a flag whose value is another flag it takes", () => {
    const read = wordsIn([LIMIT_SAID, JSON_SAID], VALUED, SWITCHES)
    expect("refused" in read).toBe(true)
  })

  test("refuses a flag said twice", () => {
    const read = wordsIn(["--contact", "a", "--contact", "b"], VALUED, SWITCHES)
    expect("refused" in read).toBe(true)
  })
})

describe("wordFilling", () => {
  test("takes the loose word where the flag is unsaid", () => {
    expect(wordFilling(said(["sleep"]), "--query", "what to search for")).toBe("sleep")
  })

  test("refuses the same thing said twice over", () => {
    const read = wordsIn(["--contact", "mary", "mary"], VALUED, SWITCHES)
    if ("refused" in read) throw new Error("this reads")
    expect("refused" in wordFilling(read, "--contact", "a contact")).toBe(true)
  })
})

describe("countOf", () => {
  test("takes a whole number above zero", () => {
    expect(countOf("5", LIMIT_SAID)).toBe(5)
  })

  test("refuses zero", () => {
    expect("refused" in Object(countOf("0", LIMIT_SAID))).toBe(true)
  })

  test("answers nothing where nothing was said", () => {
    expect(countOf(undefined, LIMIT_SAID)).toBeUndefined()
  })
})

describe("messageLines", () => {
  test("answers oldest first with an arrow saying which way it went", () => {
    const lines = messageLines(
      [message({ rowid: 2, text: "later", isFromMe: true }), message({ rowid: 1, text: "sooner" })],
      namingIn([])
    )
    expect(lines[0]?.includes("sooner")).toBe(true)
    expect(lines[1]?.includes("→")).toBe(true)
  })
})
