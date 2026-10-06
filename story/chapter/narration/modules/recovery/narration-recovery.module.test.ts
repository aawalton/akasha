import { describe, expect, test } from "bun:test"
import {
  healed,
  REOPENS,
  reopenWait,
} from "akasha/story/chapter/narration/modules/recovery/narration-recovery.module.code.ts"

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
