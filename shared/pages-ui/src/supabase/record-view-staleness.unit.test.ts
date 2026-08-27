import { describe, expect, test } from "bun:test"
import { shouldRecordView, VIEW_RECORD_STALENESS_MS } from "./record-view-staleness"

const NOW = Date.parse("2026-07-05T12:00:00.000Z")

describe("shouldRecordView", () => {
  test("records when there is no prior stamp (null / undefined)", () => {
    expect(shouldRecordView(null, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
    expect(shouldRecordView(undefined, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
  })

  test("records when the prior ISO stamp is older than the window", () => {
    const old = new Date(NOW - VIEW_RECORD_STALENESS_MS - 1).toISOString()
    expect(shouldRecordView(old, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
  })

  test("skips when the prior ISO stamp is within the window (the debounce)", () => {
    const recent = new Date(NOW - 1000).toISOString()
    expect(shouldRecordView(recent, NOW, VIEW_RECORD_STALENESS_MS)).toBe(false)
  })

  test("boundary: exactly windowMs old records (>= is inclusive)", () => {
    const exactly = new Date(NOW - VIEW_RECORD_STALENESS_MS).toISOString()
    expect(shouldRecordView(exactly, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
  })

  test("accepts an epoch-ms number stamp as well as an ISO string", () => {
    expect(shouldRecordView(NOW - 1000, NOW, VIEW_RECORD_STALENESS_MS)).toBe(false)
    expect(
      shouldRecordView(NOW - VIEW_RECORD_STALENESS_MS - 1, NOW, VIEW_RECORD_STALENESS_MS)
    ).toBe(true)
  })

  test("records when the prior stamp is unparseable or a non-string/number (self-heals)", () => {
    expect(shouldRecordView("not-a-date", NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
    expect(shouldRecordView({}, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
    expect(shouldRecordView(true, NOW, VIEW_RECORD_STALENESS_MS)).toBe(true)
  })
})
