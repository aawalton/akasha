import { describe, expect, test } from "bun:test"
import {
  BeatSchema,
  renderSystemMechanics,
  systemBeatCarriesVoiceText,
} from "akasha/story/engine/core/modules/beat-schema/beat-schema.module.code.ts"

describe("BeatSchema", () => {
  test("a narrative beat carrying text is admitted", () => {
    expect(BeatSchema.safeParse({ type: "narrative", text: "the gate stood open" }).success).toBe(
      true
    )
  })

  test("a narrative beat with empty text is refused", () => {
    expect(BeatSchema.safeParse({ type: "narrative", text: "   " }).success).toBe(false)
  })

  test("a system beat carrying exactly one channel is admitted", () => {
    expect(BeatSchema.safeParse({ type: "system", title: "Level up" }).success).toBe(true)
    expect(
      BeatSchema.safeParse({
        type: "system",
        mechanics: { poolChanges: [{ pool: "hp", delta: -2, newTotal: 8 }] },
      }).success
    ).toBe(true)
  })

  test("a system beat carrying no channel at all is refused", () => {
    expect(BeatSchema.safeParse({ type: "system" }).success).toBe(false)
    expect(BeatSchema.safeParse({ type: "system", title: "  ", lines: ["  "] }).success).toBe(false)
  })

  test("a system beat carrying more than one channel is refused", () => {
    expect(
      BeatSchema.safeParse({
        type: "system",
        title: "Level up",
        mechanics: { poolChanges: [{ pool: "hp", delta: 1, newTotal: 9 }] },
      }).success
    ).toBe(false)
  })

  test("a type the code does not name is refused", () => {
    expect(BeatSchema.safeParse({ type: "aside", text: "x" }).success).toBe(false)
  })
})

describe("systemBeatCarriesVoiceText", () => {
  test("a non-empty title or line counts as voice", () => {
    expect(systemBeatCarriesVoiceText({ type: "system", title: "Level up" })).toBe(true)
    expect(systemBeatCarriesVoiceText({ type: "system", lines: ["", "a line"] })).toBe(true)
  })

  test("blank text is no voice", () => {
    expect(systemBeatCarriesVoiceText({ type: "system", title: " ", lines: [" "] })).toBe(false)
    expect(systemBeatCarriesVoiceText({ type: "system" })).toBe(false)
  })
})

describe("renderSystemMechanics", () => {
  test("each pool change becomes a line", () => {
    expect(
      renderSystemMechanics({
        poolChanges: [
          { pool: "hp", delta: -2, newTotal: 8 },
          { pool: "mp", delta: 3, newTotal: 11 },
        ],
      })
    ).toEqual({ lines: ["hp -2 → 8", "mp +3 → 11"] })
  })

  test("no change is signed as a rise", () => {
    expect(renderSystemMechanics({ poolChanges: [{ pool: "hp", delta: 0, newTotal: 8 }] })).toEqual(
      { lines: ["hp +0 → 8"] }
    )
  })
})
