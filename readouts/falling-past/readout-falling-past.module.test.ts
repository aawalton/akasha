import { expect, test } from "bun:test"
import { rungsIn } from "../tier/readout-tier.module.code.ts"
import { fallsPastAt, rungUnder } from "./readout-falling-past.module.code.ts"

const SURPLUS = rungsIn({ blackAt: -12, redAt: -8, yellowAt: -4, greenAt: 0, blueAt: 4 })

const TOOK = "2026-09-10T16:00:00.000Z"

test("the rung answered for is the highest rung the reading is strictly over", () => {
  expect(rungUnder(8.926, SURPLUS)).toBe(4)
  expect(rungUnder(3.9, SURPLUS)).toBe(0)
  expect(rungUnder(-3.9, SURPLUS)).toBe(-4)
  expect(rungUnder(-11.9, SURPLUS)).toBe(-12)
})

test("a reading sitting exactly on a rung is answered for the rung under that one", () => {
  expect(rungUnder(4, SURPLUS)).toBe(0)
  expect(rungUnder(0, SURPLUS)).toBe(-4)
})

test("a reading under every rung has no rung to reach", () => {
  expect(rungUnder(-12, SURPLUS)).toBeNull()
  expect(rungUnder(-40, SURPLUS)).toBeNull()
  expect(rungUnder(1, [])).toBeNull()
})

test("the instant is the moment taken plus the hours the fall takes", () => {
  expect(fallsPastAt(8.926, 1, TOOK, SURPLUS)).toBe("2026-09-10T20:55:33.600Z")
  expect(fallsPastAt(9, 1, TOOK, SURPLUS)).toBe("2026-09-10T21:00:00.000Z")
})

test("a reading falling faster reaches the rung sooner", () => {
  expect(fallsPastAt(9, 2, TOOK, SURPLUS)).toBe("2026-09-10T18:30:00.000Z")
  expect(fallsPastAt(9, 32, TOOK, SURPLUS)).toBe("2026-09-10T16:09:22.500Z")
})

test("a reading falling at nothing an hour has no instant", () => {
  expect(fallsPastAt(9, 0, TOOK, SURPLUS)).toBeNull()
  expect(fallsPastAt(9, -1, TOOK, SURPLUS)).toBeNull()
})

test("a reading at or under the lowest rung has no instant", () => {
  expect(fallsPastAt(-12, 1, TOOK, SURPLUS)).toBeNull()
  expect(fallsPastAt(-13, 1, TOOK, SURPLUS)).toBeNull()
})

test("a reading that is no finite number has no instant", () => {
  expect(fallsPastAt(Number.NaN, 1, TOOK, SURPLUS)).toBeNull()
  expect(fallsPastAt(Number.POSITIVE_INFINITY, 1, TOOK, SURPLUS)).toBeNull()
  expect(fallsPastAt(9, Number.NaN, TOOK, SURPLUS)).toBeNull()
})

test("a moment that reads as no instant has no instant", () => {
  expect(fallsPastAt(9, 1, "never", SURPLUS)).toBeNull()
  expect(fallsPastAt(9, 1, "", SURPLUS)).toBeNull()
})

test("an instant no date can hold is no instant", () => {
  expect(fallsPastAt(1e18, 1e-12, TOOK, SURPLUS)).toBeNull()
})

test("the instant holds no now, so the wait shrinks one second per second", () => {
  const at = fallsPastAt(8.926, 1, TOOK, SURPLUS)
  expect(at).not.toBeNull()
  const reaches = Date.parse(at ?? "")
  const early = reaches - Date.parse("2026-09-10T17:00:00.000Z")
  const later = reaches - Date.parse("2026-09-10T17:30:00.000Z")
  expect(early - later).toBe(30 * 60 * 1000)
})
