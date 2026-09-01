import { describe, expect, test } from "bun:test"
import {
  discardLost,
  discardNamed,
  recordSmsDiscard,
  SMS_DISCARD_PAGE_TYPE_SLUG,
} from "./sms-discard.module.code.ts"

const DISCARDED_INBOUND = { sender: "+15550101234", reason: "unknown sender" }

const AN_INSTANT = "2026-08-31T14:05:09.123Z"

describe("discardNamed", () => {
  test("turns every colon and dot of an instant into a hyphen", () => {
    expect(discardNamed(AN_INSTANT)).toBe("2026-08-31T14-05-09-123Z")
  })

  test("leaves an instant carrying neither alone", () => {
    expect(discardNamed("20260831T140509Z")).toBe("20260831T140509Z")
  })
})

describe("discardLost", () => {
  test("names the page type nothing is written under", () => {
    expect(discardLost(DISCARDED_INBOUND, AN_INSTANT)).toContain(SMS_DISCARD_PAGE_TYPE_SLUG)
  })

  test("names the sender, the reason and the moment the message was turned away", () => {
    const said = discardLost(DISCARDED_INBOUND, AN_INSTANT)
    expect(said).toContain("+15550101234")
    expect(said).toContain("unknown sender")
    expect(said).toContain(AN_INSTANT)
  })

  test("says the message is lost", () => {
    expect(discardLost(DISCARDED_INBOUND, AN_INSTANT)).toContain("is lost")
  })
})

describe("recordSmsDiscard", () => {
  test("answers that nothing was recorded rather than that something was", async () => {
    const held = await recordSmsDiscard(DISCARDED_INBOUND, AN_INSTANT)
    expect(held.kind).toBe("not-recorded")
  })

  test("carries the whole loss into the reason it answers with", async () => {
    const held = await recordSmsDiscard(DISCARDED_INBOUND, AN_INSTANT)
    if (held.kind !== "not-recorded") return
    expect(held.reason).toBe(discardLost(DISCARDED_INBOUND, AN_INSTANT))
  })

  test("writes the loss where a reader of the logs meets it", async () => {
    const held: unknown[] = []
    const spoke = console.error
    console.error = (...said: unknown[]) => {
      held.push(said[0])
    }
    try {
      await recordSmsDiscard(DISCARDED_INBOUND, AN_INSTANT)
    } finally {
      console.error = spoke
    }
    expect(String(held[0])).toContain("+15550101234")
  })

  test("names the moment of the loss as now where no instant is given", async () => {
    const held = await recordSmsDiscard(DISCARDED_INBOUND)
    if (held.kind !== "not-recorded") return
    expect(held.reason).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)
  })
})
