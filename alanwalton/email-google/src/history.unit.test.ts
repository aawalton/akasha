import { describe, expect, test } from "bun:test"
import { extractMessageIds } from "./history"
import { gmailHistoryListSchema, gmailProfileSchema } from "./schema"

describe("extractMessageIds", () => {
  test("collects message ids across history entries, preserving order + dups", () => {
    const parsed = gmailHistoryListSchema.parse({
      history: [
        { messagesAdded: [{ message: { id: "a" } }, { message: { id: "b" } }] },
        { messagesAdded: [{ message: { id: "a" } }] },
        { id: "no-messages-added" },
      ],
      historyId: "12345",
    })
    expect(extractMessageIds(parsed)).toEqual(["a", "b", "a"])
  })

  test("empty history → []", () => {
    expect(extractMessageIds(gmailHistoryListSchema.parse({ historyId: "9" }))).toEqual([])
  })

  test("tolerates messagesAdded entries missing a message ref", () => {
    const parsed = gmailHistoryListSchema.parse({
      history: [{ messagesAdded: [{}, { message: { id: "c" } }] }],
    })
    expect(extractMessageIds(parsed)).toEqual(["c"])
  })
})

describe("boundary schemas", () => {
  test("gmailProfileSchema parses a profile and tolerates extra fields", () => {
    const p = gmailProfileSchema.parse({
      emailAddress: "aawalton@gmail.com",
      messagesTotal: 42,
      historyId: "99999",
    })
    expect(p.emailAddress).toBe("aawalton@gmail.com")
    expect(p.historyId).toBe("99999")
  })

  test("gmailHistoryListSchema tolerates a paginated response shape", () => {
    const h = gmailHistoryListSchema.parse({
      history: [{ messagesAdded: [{ message: { id: "x", threadId: "t" } }] }],
      historyId: "5",
      nextPageToken: "tok",
    })
    expect(h.nextPageToken).toBe("tok")
    expect(h.history?.[0]?.messagesAdded?.[0]?.message?.id).toBe("x")
  })
})
