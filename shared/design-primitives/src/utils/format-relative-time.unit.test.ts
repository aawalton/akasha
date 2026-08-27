import { afterEach, beforeEach, describe, expect, it, setSystemTime } from "bun:test"
import { formatDuration, formatRelativeTime } from "./format-relative-time"

describe("formatDuration", () => {
  describe("non-finite input returns null", () => {
    it("returns null for NaN", () => {
      expect(formatDuration(Number.NaN)).toBe(null)
    })

    it("returns null for Infinity", () => {
      expect(formatDuration(Number.POSITIVE_INFINITY)).toBe(null)
    })

    it("returns null for -Infinity", () => {
      expect(formatDuration(Number.NEGATIVE_INFINITY)).toBe(null)
    })
  })

  describe("clamps negatives to zero", () => {
    it("formats -1000 as 0s (negative clamps to 0)", () => {
      expect(formatDuration(-1000)).toBe("0s")
    })
  })

  describe("seconds-precision band (under 10m)", () => {
    it("formats 0 as 0s", () => {
      expect(formatDuration(0)).toBe("0s")
    })

    it("formats 59_000 as 59s", () => {
      expect(formatDuration(59_000)).toBe("59s")
    })

    it("formats 60_000 as 1m 0s", () => {
      expect(formatDuration(60_000)).toBe("1m 0s")
    })

    it("formats 540_000 as 9m 0s (under 10m, has seconds suffix)", () => {
      expect(formatDuration(540_000)).toBe("9m 0s")
    })

    it("formats 599_000 as 9m 59s", () => {
      expect(formatDuration(599_000)).toBe("9m 59s")
    })
  })

  describe("coarse band (10m and above)", () => {
    it("formats 600_000 as 10m (10m boundary, no seconds)", () => {
      expect(formatDuration(600_000)).toBe("10m")
    })

    it("formats 3_599_000 as 59m", () => {
      expect(formatDuration(3_599_000)).toBe("59m")
    })

    it("formats 3_600_000 as 1h", () => {
      expect(formatDuration(3_600_000)).toBe("1h")
    })

    it("formats 86_399_000 as 23h", () => {
      expect(formatDuration(86_399_000)).toBe("23h")
    })

    it("formats 86_400_000 as 1d", () => {
      expect(formatDuration(86_400_000)).toBe("1d")
    })

    it("formats 7 * 86_400_000 as 1w", () => {
      expect(formatDuration(7 * 86_400_000)).toBe("1w")
    })

    it("formats 34 * 86_400_000 as 4w (still in weeks band, weeks < 5)", () => {
      expect(formatDuration(34 * 86_400_000)).toBe("4w")
    })

    it("formats 35 * 86_400_000 as 1mo (5w boundary crosses to months)", () => {
      expect(formatDuration(35 * 86_400_000)).toBe("1mo")
    })

    it("formats 366 * 86_400_000 as 1y", () => {
      expect(formatDuration(366 * 86_400_000)).toBe("1y")
    })
  })
})

describe("formatRelativeTime", () => {
  it("returns null for empty string (NaN-producing input)", () => {
    expect(formatRelativeTime("")).toBe(null)
  })

  it("returns null for unparseable string", () => {
    expect(formatRelativeTime("not-a-date")).toBe(null)
  })

  describe("direction-aware output", () => {
    const NOW = new Date("2026-07-18T00:00:00.000Z")

    beforeEach(() => setSystemTime(NOW))
    afterEach(() => setSystemTime())

    it("renders a past instant as a bare duration (unchanged)", () => {
      expect(formatRelativeTime(NOW.getTime() - 3 * 86_400_000)).toBe("3d")
    })

    it("renders a past instant in the seconds band bare", () => {
      expect(formatRelativeTime(NOW.getTime() - 45_000)).toBe("45s")
    })

    it("renders a future instant with an 'in ' prefix (mirror of past)", () => {
      expect(formatRelativeTime(NOW.getTime() + 3 * 86_400_000)).toBe("in 3d")
    })

    it("renders a future instant in the hours band as 'in 2h'", () => {
      expect(formatRelativeTime(NOW.getTime() + 2 * 3_600_000)).toBe("in 2h")
    })

    it("renders a far-future instant as 'in 1y'", () => {
      expect(formatRelativeTime(NOW.getTime() + 366 * 86_400_000)).toBe("in 1y")
    })

    it("renders the exact-now boundary as bare 0s", () => {
      expect(formatRelativeTime(NOW.getTime())).toBe("0s")
    })

    it("collapses a sub-second future to bare 0s (no meaningful direction)", () => {
      expect(formatRelativeTime(NOW.getTime() + 500)).toBe("0s")
    })
  })
})
