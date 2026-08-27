import { describe, expect, test } from "bun:test"
import { completedAtForAbandoned } from "./session-close"

describe("completedAtForAbandoned — the completion time is observed, never invented", () => {
  test("stamps the session's last logged set, not the current time", () => {
    expect(
      completedAtForAbandoned({
        lastSetAt: "2026-06-27T20:00:58.216Z",
        startedAt: "2026-06-27T19:59:16.773Z",
      })
    ).toBe("2026-06-27T20:00:58.216Z")
  })

  test("a session that logged nothing falls back to its own start — duration zero", () => {
    expect(
      completedAtForAbandoned({ lastSetAt: null, startedAt: "2026-06-27T19:59:16.773Z" })
    ).toBe("2026-06-27T19:59:16.773Z")
  })

  test("no evidence at all leaves nothing to stamp, rather than guessing", () => {
    expect(completedAtForAbandoned({ lastSetAt: null, startedAt: null })).toBeNull()
  })

  test("the decision never reads the clock — the same input always yields the same stamp", () => {
    const input = { lastSetAt: "2026-06-24T23:50:35.278Z", startedAt: "2026-06-24T23:15:54.125Z" }
    expect(completedAtForAbandoned(input)).toBe(completedAtForAbandoned(input))
  })
})
