import { describe, expect, test } from "bun:test"
import {
  messageLines,
  namingIn,
} from "akasha/alan/harness/imessage/modules/command-reading/imessage-command-reading.module.code.ts"
import { message } from "akasha/alan/harness/imessage/modules/message-lines/message-lines.module.test-fixtures.ts"

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
