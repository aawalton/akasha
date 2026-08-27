import { describe, expect, it } from "bun:test"
import {
  decideCitationIntegrity,
  decideLoreIngestPending,
  LoreContentSchema,
  LoreEntryInputSchema,
  loreKindOf,
} from "./lore-schema"

describe("LoreContentSchema", () => {
  it("accepts each discriminated variant", () => {
    expect(
      LoreContentSchema.parse({ kind: "entity", attribute: "eyes", value: "green" }).kind
    ).toBe("entity")
    expect(LoreContentSchema.parse({ kind: "timeline", ordinal: 3, event: "the duel" }).kind).toBe(
      "timeline"
    )
    const thread = LoreContentSchema.parse({
      kind: "thread",
      status: "open",
      summary: "who killed X?",
    })
    expect(thread.kind).toBe("thread")
    if (thread.kind === "thread") expect(thread.status).toBe("open")
    expect(LoreContentSchema.parse({ kind: "quote", line: "I never lie." }).kind).toBe("quote")
  })

  it("rejects an unknown key (strict spine)", () => {
    expect(() =>
      LoreContentSchema.parse({ kind: "entity", attribute: "a", value: "b", extra: 1 })
    ).toThrow()
  })

  it("rejects an out-of-enum thread status", () => {
    expect(() =>
      LoreContentSchema.parse({ kind: "thread", status: "paused", summary: "x" })
    ).toThrow()
  })
})

describe("loreKindOf", () => {
  it("derives the stored loreKind from the content discriminant", () => {
    expect(loreKindOf({ kind: "quote", line: "hi" })).toBe("quote")
    expect(loreKindOf({ kind: "timeline", ordinal: 1, event: "e" })).toBe("timeline")
  })
})

describe("LoreEntryInputSchema", () => {
  const base = {
    externalId: "hh--entity--liska--t3--0",
    subjectKey: "liska",
    sourceTurn: "harem-hotel-t3",
    citation: { turnExternalId: "harem-hotel-t3", quote: "Liska's eyes were green." },
    content: { kind: "entity", attribute: "eyes", value: "green" },
  }

  it("parses a valid entry", () => {
    const parsed = LoreEntryInputSchema.parse(base)
    expect(parsed.subjectKey).toBe("liska")
    expect(parsed.content.kind).toBe("entity")
  })

  it("carries an optional supersedes", () => {
    const parsed = LoreEntryInputSchema.parse({ ...base, supersedes: "hh--entity--liska--t1--0" })
    expect(parsed.supersedes).toBe("hh--entity--liska--t1--0")
  })

  it("rejects an empty citation quote", () => {
    expect(() =>
      LoreEntryInputSchema.parse({ ...base, citation: { turnExternalId: "t", quote: "" } })
    ).toThrow()
  })
})

describe("decideCitationIntegrity", () => {
  const turn = "The rain fell hard.\n\n  Liska's eyes were green, cold as the sea."

  it("passes when the quote is a verbatim span", () => {
    expect(decideCitationIntegrity("Liska's eyes were green", turn).ok).toBe(true)
  })

  it("passes across reflowed whitespace", () => {
    expect(decideCitationIntegrity("The rain fell hard.  Liska's eyes", turn).ok).toBe(true)
  })

  it("fails when the quote is not present", () => {
    const r = decideCitationIntegrity("Liska's eyes were blue", turn)
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("not found")
  })

  it("fails loud on an absent cited turn text", () => {
    const r = decideCitationIntegrity("anything", undefined)
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("no published text")
  })

  it("fails on an empty quote", () => {
    expect(decideCitationIntegrity("", turn).ok).toBe(false)
  })
})

describe("decideLoreIngestPending", () => {
  it("reports a never-ingested turn as pending", () => {
    expect(
      decideLoreIngestPending([{ externalId: "t1", updatedAt: "2026-07-14T10:00:00.000Z" }])
    ).toEqual(["t1"])
  })

  it("reads a clean ingest as fresh across the µs/ms precision gap", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-07-14T10:00:00.123456Z",
          loreIngestedAt: "2026-07-14T10:00:00.124Z",
        },
      ])
    ).toEqual([])
  })

  it("re-arms on a genuine later edit that advances updatedAt past the stamp", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-07-14T10:00:05.000Z",
          loreIngestedAt: "2026-07-14T10:00:00.124Z",
        },
      ])
    ).toEqual(["t1"])
  })

  it("treats an equal stamp as fresh", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-07-14T10:00:00.000Z",
          loreIngestedAt: "2026-07-14T10:00:00.000Z",
        },
      ])
    ).toEqual([])
  })

  it("surfaces an unreadable instant as pending rather than silently clean", () => {
    expect(
      decideLoreIngestPending([
        { externalId: "t1", updatedAt: "not-an-instant", loreIngestedAt: "also-not" },
      ])
    ).toEqual(["t1"])
  })

  it("returns only the pending turns, in input order", () => {
    expect(
      decideLoreIngestPending([
        {
          externalId: "t1",
          updatedAt: "2026-07-14T10:00:00.000Z",
          loreIngestedAt: "2026-07-14T10:00:00.000Z",
        },
        { externalId: "t2", updatedAt: "2026-07-14T11:00:00.000Z" },
        {
          externalId: "t3",
          updatedAt: "2026-07-14T12:00:05.000Z",
          loreIngestedAt: "2026-07-14T12:00:00.000Z",
        },
      ])
    ).toEqual(["t2", "t3"])
  })

  it("is empty for an empty corpus", () => {
    expect(decideLoreIngestPending([])).toEqual([])
  })
})
