import { describe, expect, test } from "bun:test"
import { reserveNoveltySlot, type StarvedSlot } from "./novelty-budget"

describe("reserveNoveltySlot", () => {
  test("reserves nothing when no slot is starving — an ordinary session spends on variety", () => {
    expect(reserveNoveltySlot([])).toBeNull()
  })

  test("a never-trained pattern outranks an earlier starved slot whose pattern is covered", () => {
    const starved: readonly StarvedSlot[] = [
      { slotIndex: 1, patternUntrained: false },
      { slotIndex: 4, patternUntrained: true },
    ]
    expect(reserveNoveltySlot(starved)).toBe(4)
  })

  test("slot order breaks ties among equally untrained slots", () => {
    expect(
      reserveNoveltySlot([
        { slotIndex: 2, patternUntrained: true },
        { slotIndex: 5, patternUntrained: true },
      ])
    ).toBe(2)
  })

  test("the earliest starved slot wins when no slot's pattern is untrained", () => {
    expect(
      reserveNoveltySlot([
        { slotIndex: 3, patternUntrained: false },
        { slotIndex: 5, patternUntrained: false },
      ])
    ).toBe(3)
  })

  test("the decision is independent of the order the needs are supplied in", () => {
    expect(
      reserveNoveltySlot([
        { slotIndex: 5, patternUntrained: true },
        { slotIndex: 1, patternUntrained: false },
      ])
    ).toBe(5)
    expect(
      reserveNoveltySlot([
        { slotIndex: 5, patternUntrained: true },
        { slotIndex: 2, patternUntrained: true },
      ])
    ).toBe(2)
  })
})
