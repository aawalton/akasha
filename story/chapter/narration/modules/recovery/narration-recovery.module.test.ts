import { describe, expect, test } from "bun:test"
import {
  answerOf,
  brokenAfter,
  healed,
  REOPENS,
  reopenWait,
  streamLost,
  UNREACHABLE_GRACE_MS,
} from "akasha/story/chapter/narration/modules/recovery/narration-recovery.module.code.ts"

describe("answerOf", () => {
  test("a narration the speech workload no longer has is lost", () => {
    expect(answerOf(404)).toBe("lost")
    expect(answerOf(410)).toBe("lost")
  })

  test("a workload that cannot be reached, or no answer at all, is unreachable", () => {
    expect([502, 503, 504, null].map(answerOf)).toEqual([
      "unreachable",
      "unreachable",
      "unreachable",
      "unreachable",
    ])
  })

  test("any other answer leaves the narration alone", () => {
    expect([200, 400, 500].map(answerOf)).toEqual(["fine", "fine", "fine"])
  })
})

describe("brokenAfter", () => {
  test("a lost narration is broken at once", () => {
    expect(brokenAfter("lost", null, 0)).toEqual({ broken: true, since: null })
  })

  test("an unreachable workload breaks the narration only past the grace", () => {
    const first = brokenAfter("unreachable", null, 1000)
    expect(first).toEqual({ broken: false, since: 1000 })
    expect(brokenAfter("unreachable", 1000, 1000 + UNREACHABLE_GRACE_MS - 1).broken).toBe(false)
    expect(brokenAfter("unreachable", 1000, 1000 + UNREACHABLE_GRACE_MS).broken).toBe(true)
  })

  test("a fine answer forgets the workload was unreachable", () => {
    expect(brokenAfter("fine", 1000, 5000)).toEqual({ broken: false, since: null })
  })
})

describe("streamLost", () => {
  test("a fatal stream error or a lost narration's piece breaks the stream", () => {
    expect(streamLost(true, undefined)).toBe(true)
    expect(streamLost(false, 404)).toBe(true)
    expect(streamLost(false, 410)).toBe(true)
  })

  test("a stream error hls.js can still retry leaves the stream alone", () => {
    expect(streamLost(false, 500)).toBe(false)
    expect(streamLost(false, undefined)).toBe(false)
  })
})

describe("reopenWait", () => {
  test("each reopen waits twice as long as the one before", () => {
    expect([0, 1, 2].map(reopenWait)).toEqual([2000, 4000, 8000])
  })

  test("past the last reopen there is no wait, and the narration gives up", () => {
    expect(reopenWait(REOPENS)).toBeNull()
  })
})

describe("healed", () => {
  test("ten seconds heard after a reopen counts as brought back", () => {
    expect(healed(100, 110)).toBe(true)
    expect(healed(100, 104)).toBe(false)
  })

  test("nothing heard yet is not brought back", () => {
    expect(healed(null, 500)).toBe(false)
  })
})
