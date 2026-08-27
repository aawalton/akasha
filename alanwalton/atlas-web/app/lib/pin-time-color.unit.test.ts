import { describe, expect, test } from "bun:test"
import { IMMINENT_WINDOW_MS, pinTimeToken, TIME_BUCKET_TOKENS, timeBucket } from "./pin-time-color"

const NOW = Date.parse("2026-07-06T12:00:00Z")
const iso = (ms: number) => new Date(ms).toISOString()

describe("timeBucket — unscheduled", () => {
  test("absent scheduled start is unscheduled", () => {
    expect(timeBucket(null, null, NOW)).toBe("unscheduled")
    expect(timeBucket(undefined, undefined, NOW)).toBe("unscheduled")
    expect(timeBucket("", null, NOW)).toBe("unscheduled")
  })

  test("unparseable scheduled start is unscheduled, not a bogus bucket", () => {
    expect(timeBucket("not-a-date", null, NOW)).toBe("unscheduled")
  })
})

describe("timeBucket — point event (no end, collapses to start)", () => {
  test("a start before now is past", () => {
    expect(timeBucket(iso(NOW - 1), null, NOW)).toBe("past")
  })

  test("a start exactly at now is imminent", () => {
    expect(timeBucket(iso(NOW), null, NOW)).toBe("imminent")
  })

  test("a start within the next 24h is imminent", () => {
    expect(timeBucket(iso(NOW + 1), null, NOW)).toBe("imminent")
    expect(timeBucket(iso(NOW + IMMINENT_WINDOW_MS - 1), null, NOW)).toBe("imminent")
  })

  test("a start exactly 24h out is imminent (lead-in band is closed at start-24h)", () => {
    expect(timeBucket(iso(NOW + IMMINENT_WINDOW_MS), null, NOW)).toBe("imminent")
  })

  test("a start more than 24h out is future", () => {
    expect(timeBucket(iso(NOW + IMMINENT_WINDOW_MS + 1), null, NOW)).toBe("future")
    expect(timeBucket(iso(NOW + 5 * IMMINENT_WINDOW_MS), null, NOW)).toBe("future")
  })
})

describe("timeBucket — interval event (multi-day, stays live until over)", () => {
  test("now mid-event is imminent, not past (start passed, end ahead)", () => {
    expect(timeBucket(iso(NOW - IMMINENT_WINDOW_MS), iso(NOW + IMMINENT_WINDOW_MS), NOW)).toBe(
      "imminent"
    )
  })

  test("now exactly at the end instant is still imminent (closed at end)", () => {
    expect(timeBucket(iso(NOW - IMMINENT_WINDOW_MS), iso(NOW), NOW)).toBe("imminent")
  })

  test("now just past the end is past", () => {
    expect(timeBucket(iso(NOW - 2 * IMMINENT_WINDOW_MS), iso(NOW - 1), NOW)).toBe("past")
  })

  test("a future interval more than 24h before its start is future", () => {
    expect(
      timeBucket(iso(NOW + 3 * IMMINENT_WINDOW_MS), iso(NOW + 5 * IMMINENT_WINDOW_MS), NOW)
    ).toBe("future")
  })

  test("an end before the start collapses to a point event (bad data can't widen)", () => {
    expect(timeBucket(iso(NOW - 2 * 60 * 60 * 1000), iso(NOW - 3 * 60 * 60 * 1000), NOW)).toBe(
      "past"
    )
  })

  test("an unparseable end collapses to a point event", () => {
    expect(timeBucket(iso(NOW + 1), "not-a-date", NOW)).toBe("imminent")
  })
})

describe("pinTimeToken", () => {
  test("maps each bucket to its registered token", () => {
    expect(pinTimeToken(iso(NOW - 1), null, NOW)).toBe(TIME_BUCKET_TOKENS.past)
    expect(pinTimeToken(iso(NOW + 1), null, NOW)).toBe(TIME_BUCKET_TOKENS.imminent)
    expect(pinTimeToken(iso(NOW + 5 * IMMINENT_WINDOW_MS), null, NOW)).toBe(
      TIME_BUCKET_TOKENS.future
    )
    expect(pinTimeToken(null, null, NOW)).toBe(TIME_BUCKET_TOKENS.unscheduled)
  })

  test("a mid-event location maps to the warming-yellow token, not the past grey", () => {
    expect(pinTimeToken(iso(NOW - IMMINENT_WINDOW_MS), iso(NOW + IMMINENT_WINDOW_MS), NOW)).toBe(
      TIME_BUCKET_TOKENS.imminent
    )
  })
})

describe("TIME_BUCKET_TOKENS register", () => {
  test("imminent is the warming-yellow accent token, not red", () => {
    expect(TIME_BUCKET_TOKENS.imminent).toBe("--yellow")
    expect(TIME_BUCKET_TOKENS.imminent).not.toBe("--red")
  })

  test("future is the cool-blue token", () => {
    expect(TIME_BUCKET_TOKENS.future).toBe("--blue")
  })

  test("every bucket token is distinct", () => {
    const tokens = Object.values(TIME_BUCKET_TOKENS)
    expect(new Set(tokens).size).toBe(tokens.length)
  })
})
