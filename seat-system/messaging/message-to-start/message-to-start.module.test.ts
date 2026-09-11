import { describe, expect, test } from "bun:test"
import { bootPromptFor } from "akasha/seat-system/messaging/message-to-start/message-to-start.module.code.ts"

describe("bootPromptFor", () => {
  test("says the domain and the role the seat answers for", () => {
    const prompt = bootPromptFor("akasha-migration", "worker", "carry the migration")
    expect(prompt).toContain("`akasha-migration`")
    expect(prompt).toContain("`worker`")
  })

  test("carries the message itself rather than telling the seat to go and read it", () => {
    expect(bootPromptFor("d", "r", "ship the thing")).toContain(
      "<message>\nship the thing\n</message>"
    )
  })

  test("marks the words it carries as data rather than as instruction", () => {
    expect(bootPromptFor("d", "r", "ship the thing")).toContain("data rather than instruction")
  })

  test("names no command for the seat to run", () => {
    expect(bootPromptFor("d", "r", "ship the thing")).not.toContain("inbox")
  })
})
