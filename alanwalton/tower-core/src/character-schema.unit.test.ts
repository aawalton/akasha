import { describe, expect, it } from "bun:test"
import { GameCharacterSheetSchema, parseGameCharacterSheet } from "./character-schema"

const ALAN = {
  name: "Alan",
  kind: "player",
  level: 6,
  class: "None",
  rollMode: "1d20",
  attributes: {
    MIGHT: 14,
    FINESSE: 14,
    VITALITY: 12,
    INTELLECT: 20,
    PERCEPTION: 12,
    WILL: 20,
    PRESENCE: 16,
    LUCK: 11,
  },
  skills: [{ id: "ember-channel", name: "Ember Channel", rung: "Apprentice", displayed: 9 }],
  affinities: [{ id: "ember-affinity", name: "Ember Manipulation", counter: 7, cap: 50 }],
  equipment: { weapon: { name: "Burning Anger", atk: 10 }, armor: { def: 1 }, items: [] },
  traits: [{ id: "wild-variance", name: "Wild Variance" }],
  notes: "Glass cannon of a MIND.",
}

describe("GameCharacterSheetSchema", () => {
  it("parses the player sheet with its durable core typed", () => {
    const s = parseGameCharacterSheet(JSON.stringify(ALAN))
    expect(s.kind).toBe("player")
    expect(s.attributes.INTELLECT).toBe(20)
    expect(s.skills?.[0]?.displayed).toBe(9)
    expect(s.affinities?.[0]?.counter).toBe(7)
    expect(s.equipment?.weapon?.atk).toBe(10)
  })

  it("preserves coordinator + variance fields via passthrough (notes)", () => {
    const s = GameCharacterSheetSchema.parse(ALAN)
    expect(Reflect.get(s, "notes")).toBe("Glass cannon of a MIND.")
  })

  it("tolerates companion variance fields (role / xp / classNote) verbatim", () => {
    const companion = {
      name: "Aura",
      kind: "ally",
      role: "companion",
      level: 4,
      xp: 120,
      classNote: "complement",
      attributes: ALAN.attributes,
    }
    const s = GameCharacterSheetSchema.parse(companion)
    expect(s.kind).toBe("ally")
    expect(Reflect.get(s, "xp")).toBe(120)
    expect(Reflect.get(s, "role")).toBe("companion")
  })

  it("handles the `score`-vs-`displayed` skill variance", () => {
    const s = GameCharacterSheetSchema.parse({
      ...ALAN,
      skills: [{ name: "Chain Whip", rung: "Novice", score: 1 }],
    })
    expect(s.skills?.[0]?.score).toBe(1)
    expect(s.skills?.[0]?.displayed).toBeUndefined()
  })

  it("throws on a missing required attribute", () => {
    const bad = { ...ALAN, attributes: { MIGHT: 1 } }
    expect(() => GameCharacterSheetSchema.parse(bad)).toThrow()
  })
})
