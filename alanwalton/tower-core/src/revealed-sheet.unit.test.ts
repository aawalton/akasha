import { describe, expect, it } from "bun:test"
import { type GameCharacterSheet, GameCharacterSheetSchema } from "./character-schema"
import { RevealedSheetSchema, toRevealedSheet } from "./revealed-sheet"

const CANONICAL: GameCharacterSheet = GameCharacterSheetSchema.parse({
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
  skills: [
    {
      id: "ember-channel",
      name: "Ember Channel",
      ladder: "skill",
      rung: "Apprentice",
      displayed: 9,
      rungBand: "6-15",
      source: "SECRET coordinator provenance — seed 7223233, DC 14, margin 6",
      effect: "Engine hook: skillBonus +1 at Apprentice.",
    },
  ],
  affinities: [
    {
      id: "ember-affinity",
      name: "Ember Manipulation",
      ladder: "affinity",
      tier: "Manipulation",
      counter: 7,
      cap: 50,
      type: "Ember / Heat",
      source: "SECRET — promotion thresholds and drain events",
      effect: "intent +2 clamped at 10",
    },
  ],
  titles: [],
  equipment: {
    weapon: { name: "Burning Anger", atk: 10, note: "TURN 65 capstone forge provenance (secret)" },
    armor: { name: "Stalker hide cloak", def: 1, note: "coordinator note" },
    items: [{ name: "Hooded lantern" }],
  },
  traits: [{ id: "wild-variance", name: "Wild Variance", source: "LUCK profile", effect: "1d20" }],
  notes: "Glass cannon of a MIND.",
})

describe("toRevealedSheet — fog-of-war projection", () => {
  it("drops every coordinator-only field (no leak to the player surface)", () => {
    const revealed = toRevealedSheet(CANONICAL)
    const json = JSON.stringify(revealed)
    for (const forbidden of [
      "source",
      "effect",
      "cap",
      "counter",
      "ladder",
      "rungBand",
      "tier",
      "traits",
      "notes",
      "7223233",
      "capstone forge",
    ]) {
      expect(json).not.toContain(forbidden)
    }
  })

  it("renames durable internals to player-facing names", () => {
    const revealed = toRevealedSheet(CANONICAL)
    expect(revealed.skills?.[0]).toEqual({ name: "Ember Channel", rung: "Apprentice", score: 9 })
    expect(revealed.affinities?.[0]).toEqual({ name: "Ember Manipulation", value: 7 })
    expect(revealed.equipment?.mainHand).toEqual({ name: "Burning Anger", atk: 10 })
    expect(revealed.equipment?.cloak).toEqual({ name: "Stalker hide cloak", def: 1 })
  })

  it("preserves the attributes verbatim", () => {
    const revealed = toRevealedSheet(CANONICAL)
    expect(revealed.attributes).toEqual(CANONICAL.attributes)
  })

  it("produces a value that re-parses as a valid RevealedSheet", () => {
    const revealed = toRevealedSheet(CANONICAL)
    expect(() => RevealedSheetSchema.parse(revealed)).not.toThrow()
  })
})

describe("RevealedSheetSchema — strict allowlist", () => {
  it("strips unknown / coordinator keys fed directly to it", () => {
    const parsed = RevealedSheetSchema.parse({
      attributes: CANONICAL.attributes,
      skills: [{ name: "X", rung: "Novice", score: 1, source: "LEAK", cap: 5 }],
    })
    expect(JSON.stringify(parsed)).not.toContain("LEAK")
    expect(parsed.skills?.[0]).toEqual({ name: "X", rung: "Novice", score: 1 })
  })

  it("tolerates the live display sheet shape (derived / attrInfo / delta / inventory)", () => {
    const parsed = RevealedSheetSchema.parse({
      attributes: CANONICAL.attributes,
      derived: { "Vitae (HP)": 124, Focus: 120 },
      attrInfo: { MIGHT: "Governs physical power." },
      delta: {},
      inventory: [{ name: "Burning Anger", note: "a maul" }],
      equipment: { mainHand: { name: "Burning Anger", atk: 10 } },
    })
    expect(parsed.derived?.["Vitae (HP)"]).toBe(124)
    expect(parsed.inventory?.[0]?.name).toBe("Burning Anger")
  })
})
