import { beforeEach, describe, expect, mock, test } from "bun:test"

type Landing = { readonly ok: true } | { readonly ok: false; readonly why: string }

type Held = { given: unknown[]; landing: Landing }

function fresh(): Held {
  return { given: [], landing: { ok: true } }
}

const held = fresh()

mock.module("@akasha/pages-query", () => ({
  writePage: (...taken: unknown[]) => {
    held.given = taken
    return Promise.resolve(held.landing)
  },
}))

const { SMS_DISCARD_PAGE_TYPE_SLUG, WRITER, discardNamed, recordSmsDiscard } = await import(
  "./sms-discard.module.code.ts"
)

const DISCARDED_INBOUND = { sender: "+15550101234", reason: "unknown sender" }

beforeEach(() => {
  const clean = fresh()
  held.given = clean.given
  held.landing = clean.landing
})

describe("discardNamed", () => {
  test("turns every colon and dot of an instant into a hyphen", () => {
    expect(discardNamed("2026-08-31T14:05:09.123Z")).toBe("2026-08-31T14-05-09-123Z")
  })

  test("leaves an instant carrying neither alone", () => {
    expect(discardNamed("20260831T140509Z")).toBe("20260831T140509Z")
  })
})

describe("recordSmsDiscard", () => {
  test("names the page for the instant of the discard", async () => {
    await recordSmsDiscard(DISCARDED_INBOUND, "2026-08-31T14:05:09.123Z")
    expect(held.given[0]).toBe(SMS_DISCARD_PAGE_TYPE_SLUG)
    expect(held.given[1]).toBe("2026-08-31T14-05-09-123Z")
    expect(held.given[3]).toBe(WRITER)
  })

  test("writes the sender and the reason down beside the instant", async () => {
    await recordSmsDiscard(DISCARDED_INBOUND, "2026-08-31T14:05:09.123Z")
    expect(held.given[2]).toMatchObject({
      sender: "+15550101234",
      reason: "unknown sender",
      "discarded-at": "2026-08-31T14:05:09.123Z",
    })
  })

  test("answers recorded where the write lands", async () => {
    expect(await recordSmsDiscard(DISCARDED_INBOUND)).toEqual({ kind: "recorded" })
  })

  test("answers not recorded rather than throwing where the write does not land", async () => {
    held.landing = { ok: false, why: "the store refused" }
    expect(await recordSmsDiscard(DISCARDED_INBOUND)).toEqual({
      kind: "not-recorded",
      reason: "the store refused",
    })
  })

  test("names the page for now where no instant is given", async () => {
    await recordSmsDiscard(DISCARDED_INBOUND)
    expect(held.given[1]).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/)
  })
})
