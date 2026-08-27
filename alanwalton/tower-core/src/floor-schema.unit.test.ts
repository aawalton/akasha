import { describe, expect, it } from "bun:test"
import { FloorSchema, parseFloor } from "./floor-schema"

const FLOOR_01 = {
  floor: 1,
  name: "The Threshold",
  theme: "A cold stone landing at the tower's base.",
  exits: ["ascending stair (sealed until the floor is cleared)"],
  rooms: [
    {
      id: "threshold-landing",
      name: "The Landing",
      desc: "The cold, near-lightless room Alan woke in.",
      searchables: [
        { thing: "rusted iron bar", use: "improvised weapon, +4 Atk", status: "TAKEN" },
      ],
      water: "damp, not pooled",
    },
  ],
  encounters: [
    {
      id: "ashling-01",
      trigger: "first movement past the iron door",
      enemy: {
        name: "Ashling",
        kind: "enemy",
        level: 1,
        class: "Ember-thing",
        attributes: {
          MIGHT: 7,
          FINESSE: 8,
          VITALITY: 5,
          INTELLECT: 3,
          PERCEPTION: 7,
          WILL: 4,
          PRESENCE: 3,
          LUCK: 5,
        },
        equipment: { weapon: { atk: 0 }, armor: { def: 0 } },
        baseDamage: 8,
        intentTypical: 2,
        readableTrait: "the core is the kill",
        hpNote: "VIT8+MIGHT2 = 54 HP",
      },
      reward: { xp: 60, drop: "a warm fist-sized cinder" },
    },
  ],
  designerNotes:
    "COORDINATOR-ONLY — difficulty intent. MAY reference the loop. Never shown to Alan.",
}

describe("FloorSchema", () => {
  it("parses a floor with rooms + inline enemy encounters", () => {
    const f = parseFloor(JSON.stringify(FLOOR_01))
    expect(f.floor).toBe(1)
    expect(f.rooms?.[0]?.id).toBe("threshold-landing")
    expect(f.encounters?.[0]?.enemy.name).toBe("Ashling")
    expect(f.encounters?.[0]?.enemy.baseDamage).toBe(8)
    expect(f.encounters?.[0]?.reward?.xp).toBe(60)
  })

  it("does NOT expose designerNotes on the typed surface (loop-dark)", () => {
    const f = parseFloor(JSON.stringify(FLOOR_01))
    expect(Object.keys(f)).toContain("designerNotes")
    const typedKeys: (keyof typeof f)[] = ["floor", "name", "theme", "exits", "rooms", "encounters"]
    expect(typedKeys.every((k) => k in f)).toBe(true)
  })

  it("throws on a non-enemy inline enemy kind", () => {
    const bad = {
      ...FLOOR_01,
      encounters: [{ id: "x", enemy: { ...FLOOR_01.encounters[0]?.enemy, kind: "player" } }],
    }
    expect(() => FloorSchema.parse(bad)).toThrow()
  })
})
