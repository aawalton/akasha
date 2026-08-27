import { describe, expect, test } from "bun:test"
import { isSentLabeled, isSpamLabeled } from "./inbound-adapter"

describe("isSpamLabeled", () => {
  test("true when labelIds includes SPAM", () => {
    expect(isSpamLabeled(["SPAM"])).toBe(true)
  })

  test("true when SPAM sits alongside other labels", () => {
    expect(isSpamLabeled(["CATEGORY_PROMOTIONS", "SPAM", "UNREAD"])).toBe(true)
  })

  test("false when SPAM is absent", () => {
    expect(isSpamLabeled(["INBOX", "UNREAD"])).toBe(false)
  })

  test("false for an empty label set", () => {
    expect(isSpamLabeled([])).toBe(false)
  })

  test("false when labelIds is absent entirely", () => {
    expect(isSpamLabeled(undefined)).toBe(false)
  })
})

describe("isSentLabeled", () => {
  test("true when labelIds includes SENT (Alan's own outbound mail)", () => {
    expect(isSentLabeled(["SENT"])).toBe(true)
  })

  test("true when SENT sits alongside other labels", () => {
    expect(isSentLabeled(["SENT", "IMPORTANT", "CATEGORY_PERSONAL"])).toBe(true)
  })

  test("false for delivered (INBOX) mail without SENT", () => {
    expect(isSentLabeled(["INBOX", "UNREAD"])).toBe(false)
  })

  test("false for an empty label set", () => {
    expect(isSentLabeled([])).toBe(false)
  })

  test("false when labelIds is absent entirely", () => {
    expect(isSentLabeled(undefined)).toBe(false)
  })
})
