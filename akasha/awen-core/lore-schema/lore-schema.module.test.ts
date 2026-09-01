import { describe, expect, test } from "bun:test"
import {
  decideCitationIntegrity,
  decideLoreIngestPending,
  isLoreKind,
  LoreContentSchema,
  loreKindOf,
} from "./lore-schema.module.code.ts"

describe("isLoreKind", () => {
  test("names the four kinds", () => {
    expect(["entity", "timeline", "thread", "quote"].every(isLoreKind)).toBe(true)
  })

  test("refuses a kind the code does not name", () => {
    expect(isLoreKind("rumour")).toBe(false)
  })
})

describe("LoreContentSchema", () => {
  test("each kind carries its own fields", () => {
    expect(
      LoreContentSchema.safeParse({ kind: "entity", attribute: "eyes", value: "grey" }).success
    ).toBe(true)
    expect(
      LoreContentSchema.safeParse({ kind: "thread", status: "open", summary: "the debt" }).success
    ).toBe(true)
  })

  test("a thread standing the code does not name is refused", () => {
    expect(
      LoreContentSchema.safeParse({ kind: "thread", status: "paused", summary: "s" }).success
    ).toBe(false)
  })

  test("reads the kind off the content", () => {
    expect(loreKindOf({ kind: "timeline", ordinal: 1, event: "the gate opened" })).toBe("timeline")
  })
})

describe("decideCitationIntegrity", () => {
  const turn = "She lets her shoulders drop.\n\n  Something settles below   her ribs."

  test("a quote standing word for word in the turn holds", () => {
    expect(decideCitationIntegrity("She lets her shoulders drop.", turn)).toEqual({ ok: true })
  })

  test("whitespace between the words does not break the match", () => {
    expect(decideCitationIntegrity("Something settles below her ribs.", turn).ok).toBe(true)
  })

  test("a quote not in the turn is refused", () => {
    const decided = decideCitationIntegrity("She turned away.", turn)
    expect(decided.ok).toBe(false)
    expect(decided.reason).toContain("verbatim")
  })

  test("a turn with no published text cannot be cited", () => {
    expect(decideCitationIntegrity("anything", undefined).ok).toBe(false)
    expect(decideCitationIntegrity("anything", "").ok).toBe(false)
  })

  test("an empty quote is refused", () => {
    const decided = decideCitationIntegrity("   ", turn)
    expect(decided.ok).toBe(false)
    expect(decided.reason).toContain("empty")
  })
})

describe("decideLoreIngestPending", () => {
  test("a turn never read for lore is pending", () => {
    expect(
      decideLoreIngestPending([{ externalId: "t1", updatedAt: "2026-01-01T00:00:00Z" }])
    ).toEqual(["t1"])
  })

  test("a turn read after its last edit is settled", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-01-01T00:00:00Z",
          loreIngestedAt: "2026-01-02T00:00:00Z",
        },
      ])
    ).toEqual([])
  })

  test("a turn edited after it was read is pending again", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-01-03T00:00:00Z",
          loreIngestedAt: "2026-01-02T00:00:00Z",
        },
      ])
    ).toEqual(["t1"])
  })

  test("an unreadable stamp leaves the turn pending", () => {
    expect(
      decideLoreIngestPending([
        { externalId: "t1", updatedAt: "not a date", loreIngestedAt: "2026-01-02T00:00:00Z" },
      ])
    ).toEqual(["t1"])
  })

  test("an empty read stamp counts as never read", () => {
    expect(
      decideLoreIngestPending([
        { externalId: "t1", updatedAt: "2026-01-01T00:00:00Z", loreIngestedAt: "" },
      ])
    ).toEqual(["t1"])
  })
})
