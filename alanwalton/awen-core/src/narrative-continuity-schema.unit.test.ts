import { describe, expect, test } from "bun:test"
import {
  FrameMapEntrySchema,
  FrameSchema,
  NarrativeContinuitySchema,
  parseNarrativeContinuity,
} from "./narrative-continuity-schema"

const dragonsReference = {
  narration: {
    person: "first",
    povCharacter: "alan",
    rule: "First-person Alan (the monk) throughout; all other characters in third person.",
  },
  frames: [
    {
      id: "table",
      name: "The Table (Caer Arianrhod balcony)",
      description: "The real people playing the game on the balcony of Caer Arianrhod.",
    },
    {
      id: "game-world",
      name: "The Game World",
      description: "The tale itself — the world the characters adventure in.",
    },
  ],
  transitions: {
    marking: "boundaries-only",
    convention:
      "Dissolve imagery marks each frame transition at the boundary; within a frame, no per-line frame distinctions.",
  },
  frameMap: [
    {
      character: "alan",
      identities: { table: "Alan, the player", "game-world": "the monk (first-person narrator)" },
    },
    {
      character: "mari",
      identities: { table: "Mari, herself at the table", "game-world": "the wet-haired girl" },
    },
    {
      character: "aria",
      identities: { table: "Aria, the DM", "game-world": "the voice of the world" },
    },
    {
      character: "ceri",
      identities: { table: "Ceri — the empty seat, not yet arrived" },
      rule: "Table-only until she arrives; never present in the game world.",
    },
  ],
}

describe("NarrativeContinuitySchema", () => {
  test("parses the dragons-shaped reference", () => {
    const parsed = NarrativeContinuitySchema.parse(dragonsReference)
    expect(parsed.narration.person).toBe("first")
    expect(parsed.narration.povCharacter).toBe("alan")
    expect(parsed.frames.map((f) => f.id)).toEqual(["table", "game-world"])
    expect(parsed.transitions?.marking).toBe("boundaries-only")
    expect(parsed.frameMap).toHaveLength(4)
  })

  test("a single-frame game needs only narration — frames/frameMap default empty", () => {
    const minimal = NarrativeContinuitySchema.parse({
      narration: { person: "second", rule: "The System addresses the climber as you." },
    })
    expect(minimal.frames).toEqual([])
    expect(minimal.frameMap).toEqual([])
    expect(minimal.transitions).toBeUndefined()
  })

  test("strict spine (#14466): an unknown top-level key fails loud naming the key", () => {
    expect(() => NarrativeContinuitySchema.parse({ ...dragonsReference, tense: "past" })).toThrow(
      /tense/
    )
  })

  test("the modeled `canon` axis (live on partners) parses as a string array, defaults empty", () => {
    const withCanon = NarrativeContinuitySchema.parse({
      ...dragonsReference,
      canon: ["wiki/alan.md", "wiki/mari.md"],
    })
    expect(withCanon.canon).toEqual(["wiki/alan.md", "wiki/mari.md"])
    const withoutCanon = NarrativeContinuitySchema.parse(dragonsReference)
    expect(withoutCanon.canon).toEqual([])
  })

  test("rejects an unknown narration person", () => {
    expect(() =>
      NarrativeContinuitySchema.parse({ narration: { person: "fourth", rule: "x" } })
    ).toThrow()
  })

  test("rejects an unknown transition marking", () => {
    expect(() =>
      NarrativeContinuitySchema.parse({
        narration: dragonsReference.narration,
        transitions: { marking: "sometimes" },
      })
    ).toThrow()
  })

  test("inner shapes are strict — an unknown frame key fails loud", () => {
    expect(() => FrameSchema.parse({ id: "table", name: "The Table", mood: "cozy" })).toThrow()
    expect(() =>
      FrameMapEntrySchema.parse({ character: "mari", identities: {}, frame: "table" })
    ).toThrow()
  })

  test("a frame-map identity record maps frame ids to identity strings", () => {
    const entry = FrameMapEntrySchema.parse(dragonsReference.frameMap[1])
    expect(entry.identities["game-world"]).toBe("the wet-haired girl")
  })
})

describe("parseNarrativeContinuity (boundary helper)", () => {
  test("returns null on absent / non-object values", () => {
    expect(parseNarrativeContinuity(undefined)).toBeNull()
    expect(parseNarrativeContinuity(null)).toBeNull()
    expect(parseNarrativeContinuity("first person")).toBeNull()
  })

  test("parses a stored reference object", () => {
    const parsed = parseNarrativeContinuity(dragonsReference)
    expect(parsed?.narration.rule).toContain("First-person Alan")
  })

  test("throws on a present-but-malformed reference (fail loud, never guess)", () => {
    expect(() => parseNarrativeContinuity({ narration: { person: "first" } })).toThrow()
  })
})
