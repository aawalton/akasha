import { describe, expect, test } from "bun:test"
import { heldAhead } from "akasha/story/chapter/narration/modules/report/narration-report.module.code.ts"

describe("heldAhead", () => {
  test("the audio held past the playhead is counted to the end of the range holding it", () => {
    expect(heldAhead([[0, 120]], 100)).toBe(20)
  })

  test("a range starting just past the playhead still holds it", () => {
    expect(heldAhead([[100.3, 130]], 100)).toBe(30)
  })

  test("a playhead no range holds has nothing ahead", () => {
    expect(
      heldAhead(
        [
          [0, 50],
          [200, 300],
        ],
        100
      )
    ).toBe(0)
    expect(heldAhead([], 0)).toBe(0)
  })
})
