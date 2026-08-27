import { describe, expect, it } from "bun:test"
import {
  formatCollectionProgress,
  formatDisplayValue,
  formatDuration,
  WORDS_PER_MINUTE,
  wordsToMinutes,
} from "./index"

describe("WORDS_PER_MINUTE", () => {
  it("is 250", () => {
    expect(WORDS_PER_MINUTE).toBe(250)
  })
})

describe("wordsToMinutes", () => {
  it("returns 0 for 0 words", () => {
    expect(wordsToMinutes(0)).toBe(0)
  })

  it("returns 1 for 250 words", () => {
    expect(wordsToMinutes(250)).toBe(1)
  })

  it("returns 2 for 500 words", () => {
    expect(wordsToMinutes(500)).toBe(2)
  })

  it("rounds 125 words to 1 (Math.round of 0.5)", () => {
    expect(wordsToMinutes(125)).toBe(1)
  })

  it("rounds 124 words to 0 (Math.round of 0.496)", () => {
    expect(wordsToMinutes(124)).toBe(0)
  })
})

describe("formatDuration", () => {
  it("formats 0 minutes as 0m", () => {
    expect(formatDuration(0)).toBe("0m")
  })

  it("formats 59 minutes as 59m", () => {
    expect(formatDuration(59)).toBe("59m")
  })

  it("formats 60 minutes as 1h", () => {
    expect(formatDuration(60)).toBe("1h")
  })

  it("formats 90 minutes as 1.5h", () => {
    expect(formatDuration(90)).toBe("1.5h")
  })

  it("formats 120 minutes as 2h", () => {
    expect(formatDuration(120)).toBe("2h")
  })
})

describe("formatDisplayValue", () => {
  it("formats with Minutes unit via duration", () => {
    expect(formatDisplayValue(15000, "Minutes")).toBe("1h")
  })

  it("formats without Minutes unit as locale string", () => {
    expect(formatDisplayValue(1500)).toBe("1,500")
  })

  it("formats 0 words with Minutes as 0m", () => {
    expect(formatDisplayValue(0, "Minutes")).toBe("0m")
  })
})

describe("formatCollectionProgress", () => {
  it("shows remaining words", () => {
    expect(formatCollectionProgress(300, 1000)).toBe("700 words")
  })

  it("clamps remaining at 0 when progress exceeds length", () => {
    expect(formatCollectionProgress(1200, 1000)).toBe("0 words")
  })

  it("formats remaining as duration with Minutes unit", () => {
    expect(formatCollectionProgress(500, 1000, "Minutes")).toBe("2m")
  })

  it("shows 0m when complete with Minutes unit", () => {
    expect(formatCollectionProgress(1000, 1000, "Minutes")).toBe("0m")
  })
})
