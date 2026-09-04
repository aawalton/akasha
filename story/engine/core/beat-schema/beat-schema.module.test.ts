import { describe, expect, test } from "bun:test"
import {
  BeatSchema,
  beatIdentityKey,
  beatIsGrandfathered,
  canonicalBeatKey,
  droppedBeats,
  renderSystemMechanics,
  storedBeatGrandfatherKeys,
  systemBeatCarriesVoiceText,
  WriteBeatSchema,
} from "./beat-schema.module.code.ts"

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

describe("WriteBeatSchema", () => {
  test("a beat written to the log carries its turn", () => {
    expect(WriteBeatSchema.safeParse({ type: "narrative", text: "a", turn: 3 }).success).toBe(true)
  })

  test("a beat with no turn stamp is refused", () => {
    expect(WriteBeatSchema.safeParse({ type: "narrative", text: "a" }).success).toBe(false)
  })
})

describe("canonicalBeatKey", () => {
  test("key order does not change the key", () => {
    expect(canonicalBeatKey({ b: 1, a: 2 })).toBe(canonicalBeatKey({ a: 2, b: 1 }))
  })

  test("undefined values are left out", () => {
    expect(canonicalBeatKey({ a: 1, b: undefined })).toBe(canonicalBeatKey({ a: 1 }))
  })

  test("array order does change the key", () => {
    expect(canonicalBeatKey([1, 2])).not.toBe(canonicalBeatKey([2, 1]))
  })

  test("differing content gives differing keys", () => {
    expect(canonicalBeatKey({ text: "a" })).not.toBe(canonicalBeatKey({ text: "b" }))
  })
})

describe("beatIsGrandfathered", () => {
  test("a beat already stored is known again", () => {
    const keys = storedBeatGrandfatherKeys([{ type: "narrative", text: "a" }])
    expect(beatIsGrandfathered({ text: "a", type: "narrative" }, keys)).toBe(true)
    expect(beatIsGrandfathered({ type: "narrative", text: "b" }, keys)).toBe(false)
  })
})

describe("beatIdentityKey", () => {
  test("a beat with an id is known by it", () => {
    expect(beatIdentityKey({ id: 4, text: "a" })).toBe("id:4")
    expect(beatIdentityKey({ id: 4, text: "b" })).toBe(beatIdentityKey({ id: 4, text: "a" }))
  })

  test("a beat with no id is known by its content", () => {
    expect(beatIdentityKey({ text: "a" })).toBe(`content:${canonicalBeatKey({ text: "a" })}`)
  })
})

describe("droppedBeats", () => {
  test("a stored beat the incoming log no longer holds is dropped", () => {
    const stored = [
      { id: 1, text: "a" },
      { id: 2, text: "b" },
    ]
    expect(droppedBeats(stored, [{ id: 1, text: "a" }])).toEqual([{ id: 2, text: "b" }])
  })

  test("a beat kept under its id is not dropped though its text changed", () => {
    expect(droppedBeats([{ id: 1, text: "a" }], [{ id: 1, text: "edited" }])).toEqual([])
  })

  test("nothing incoming drops everything stored", () => {
    expect(droppedBeats([{ id: 1 }], [])).toEqual([{ id: 1 }])
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
