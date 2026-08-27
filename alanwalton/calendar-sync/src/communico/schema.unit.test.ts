import { describe, expect, test } from "bun:test"
import { caldataEventSchema, caldataResponseSchema } from "./schema"

describe("caldataEventSchema", () => {
  test("parses a minimal occurrence and preserves unknown fields via passthrough", () => {
    const parsed = caldataEventSchema.parse({
      id: "1",
      title: "Event",
      raw_start_time: "2026-06-06 09:00:00",
      recurring_id: "abc",
      venue_type: "internal",
    })
    expect(parsed.id).toBe("1")
    expect(parsed.title).toBe("Event")
    expect(Object.keys(parsed)).toContain("recurring_id")
    expect(Object.keys(parsed)).toContain("venue_type")
  })

  test("rejects an occurrence missing the required id/title/start", () => {
    expect(() => caldataEventSchema.parse({ title: "no id", raw_start_time: "x" })).toThrow()
  })

  test("parses an array response", () => {
    const rows = caldataResponseSchema.parse([
      { id: "1", title: "A", raw_start_time: "2026-06-06 09:00:00" },
      { id: "2", title: "B", raw_start_time: "2026-06-07 10:00:00" },
    ])
    expect(rows).toHaveLength(2)
    expect(rows[1]?.id).toBe("2")
  })
})
