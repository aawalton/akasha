import { describe, expect, test } from "bun:test"
import { formatForSpeech, planSpeechSegments } from "../speech"
import { packedAlphaText } from "./test-helpers"

describe("planSpeechSegments", () => {
  test("a single segment keeps the bare message id and a plain label", () => {
    expect(planSpeechSegments("019abc", ["Just one sentence."])).toEqual([
      { id: "019abc", text: "Just one sentence.", label: "message 019abc" },
    ])
  })

  test("multiple segments get -segN ids and k/total labels", () => {
    expect(planSpeechSegments("019abc", ["First part.", "Second part.", "Third part."])).toEqual([
      { id: "019abc-seg0", text: "First part.", label: "message 019abc segment 1/3" },
      { id: "019abc-seg1", text: "Second part.", label: "message 019abc segment 2/3" },
      { id: "019abc-seg2", text: "Third part.", label: "message 019abc segment 3/3" },
    ])
  })

  test("empty input yields no plans", () => {
    expect(planSpeechSegments("019abc", [])).toEqual([])
  })

  test("empty-text segments are dropped while ids stay positional", () => {
    expect(planSpeechSegments("019abc", ["", "Real text."])).toEqual([
      { id: "019abc-seg1", text: "Real text.", label: "message 019abc segment 2/2" },
    ])
  })

  test("ids are unique across a multi-segment plan", () => {
    const plans = planSpeechSegments("019abc", ["a.", "b.", "c.", "d."])
    expect(new Set(plans.map((p) => p.id)).size).toBe(plans.length)
  })

  test("plan order and text match the input segment order exactly", () => {
    const segments = formatForSpeech(packedAlphaText())
    expect(segments.length).toBeGreaterThan(1)
    const plans = planSpeechSegments("msg", segments)
    expect(plans.map((p) => p.text)).toEqual([...segments])
  })
})
