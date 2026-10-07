import { describe, expect, test } from "bun:test"
import {
  answerOf,
  brokenAfter,
  healed,
  REOPENS,
  reopenWait,
  streamLost,
  TOP_UP_EVERY_MS,
  topUpOf,
  UNREACHABLE_GRACE_MS,
} from "akasha/story/chapter/narration/modules/recovery/narration-recovery.module.code.ts"

const SHORT = { ahead: 300, at: 1000, end: 20_000, grew: false, toppedAt: null, now: 500_000 }

describe("topUpOf", () => {
  test("ten minutes held past the playhead is enough", () => {
    expect(topUpOf({ ...SHORT, ahead: 600 })).toBe("enough")
  })

  test("a stream held to its end is enough however little is left", () => {
    expect(topUpOf({ ...SHORT, ahead: 30, end: 1030 })).toBe("enough")
  })

  test("less than ten minutes held, and nothing arriving, asks the stream again", () => {
    expect(topUpOf(SHORT)).toBe("top-up")
  })

  test("audio still arriving is left to arrive", () => {
    expect(topUpOf({ ...SHORT, grew: true })).toBe("wait")
  })

  test("a stream is asked again at most once a minute", () => {
    const toppedAt = SHORT.now - TOP_UP_EVERY_MS + 1
    expect(topUpOf({ ...SHORT, toppedAt })).toBe("wait")
    expect(topUpOf({ ...SHORT, toppedAt: SHORT.now - TOP_UP_EVERY_MS })).toBe("top-up")
  })

  test("a playhead run dry after asking again is dry", () => {
    expect(topUpOf({ ...SHORT, ahead: 0, toppedAt: SHORT.now - 10_000 })).toBe("dry")
    expect(topUpOf({ ...SHORT, ahead: 0, toppedAt: SHORT.now - 9_000 })).toBe("wait")
  })

  test("a playhead run dry with no ask yet asks first", () => {
    expect(topUpOf({ ...SHORT, ahead: 0 })).toBe("top-up")
  })
})

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
