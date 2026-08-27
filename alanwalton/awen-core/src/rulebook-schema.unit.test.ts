import { describe, expect, test } from "bun:test"
import { GameRulebookSchema } from "./game-schema"
import {
  AttackModeSchema,
  DerivedStatSchema,
  DiceSystemSchema,
  parseRulebookMechanics,
  ResolutionRulesSchema,
  RulebookSchema,
} from "./rulebook-schema"

describe("linear-form derived stats", () => {
  test("a derived stat is a linear form with an id; defaults fill", () => {
    const hpMax = DerivedStatSchema.parse({
      id: "hpMax",
      terms: [
        { attr: "VITALITY", coef: 8 },
        { attr: "MIGHT", coef: 2 },
      ],
      round: "round",
    })
    expect(hpMax.id).toBe("hpMax")
    expect(hpMax.equip).toEqual([])
    expect(hpMax.constant).toBe(0)
  })

  test("an equipment term draws a slot's stat", () => {
    const physAtk = DerivedStatSchema.parse({
      id: "physAtk",
      terms: [
        { attr: "MIGHT", coef: 1.5 },
        { attr: "FINESSE", coef: 1 },
      ],
      equip: [{ slot: "weapon", stat: "atk", coef: 1 }],
    })
    expect(physAtk.equip[0]?.slot).toBe("weapon")
    expect(physAtk.round).toBe("none")
  })

  test("rejects an unknown key (strict)", () => {
    expect(() => DerivedStatSchema.parse({ id: "x", bogus: true })).toThrow()
  })
})

describe("attack modes + dice", () => {
  test("power source is a derived reference or an inline form", () => {
    const phys = AttackModeSchema.parse({
      id: "phys",
      power: { derived: "physAtk" },
      defense: "physDef",
    })
    const ment = AttackModeSchema.parse({
      id: "ment",
      power: {
        form: {
          terms: [
            { attr: "INTELLECT", coef: 1.2 },
            { attr: "WILL", coef: 1 },
          ],
        },
      },
      defense: "mentDef",
    })
    expect(phys.power).toEqual({ derived: "physAtk" })
    expect("form" in ment.power).toBe(true)
  })

  test("dice system defaults crit/fumble to max/min total", () => {
    const d = DiceSystemSchema.parse({ id: "2d10", sides: 10, count: 2 })
    expect(d.critOn).toBe("maxTotal")
    expect(d.fumbleOn).toBe("minTotal")
  })
})

describe("resolution", () => {
  test("bands + clamps + defaults parse", () => {
    const res = ResolutionRulesSchema.parse({
      intentClamp: { min: 0, max: 10 },
      gate: { default: 1, min: 0 },
      marginDivisor: 12,
      bands: [
        { id: "fumble", when: { flag: "fumble" }, result: "miss" },
        { id: "crit", when: { flag: "crit" }, result: "hit", scale: { marginFloor: 6, mult: 1.5 } },
        { id: "hit", when: { marginGte: 0 }, result: "hit", scale: { mult: 1 } },
        { id: "graze", when: { marginGt: -3 }, result: "hit", scale: { flat: 0.25 } },
        { id: "miss", when: { always: true }, result: "miss" },
      ],
    })
    expect(res.round).toBe("tenths")
    expect(res.damageFloor).toBe(1)
    expect(res.bands).toHaveLength(5)
  })
})

describe("rulebook top-level + extraction", () => {
  test("a zero-mechanics rulebook omits resolution", () => {
    const rb = RulebookSchema.parse({ systemType: "authored", attributes: [] })
    expect(rb.resolution).toBeUndefined()
    expect(rb.derivedStats).toEqual([])
  })

  test("parseRulebookMechanics returns null when no mechanics block is present", () => {
    expect(parseRulebookMechanics({ systemType: "authored", progression: "narrative" })).toBeNull()
    expect(parseRulebookMechanics(undefined)).toBeNull()
  })

  test("parseRulebookMechanics extracts the structured block from a game rulebook", () => {
    const gameRulebook = {
      systemType: "leveled-rpg",
      mechanics: { systemType: "leveled-rpg", attributes: [{ id: "MIGHT" }] },
    }
    const mechanics = parseRulebookMechanics(gameRulebook)
    expect(mechanics?.attributes[0]?.id).toBe("MIGHT")
  })

  test("ADDITIVITY: a rulebook carrying a .mechanics block still parses through the unchanged spine", () => {
    const parsed = GameRulebookSchema.parse({
      systemType: "leveled-rpg",
      summary: "ascend by clearing challenges",
      progression: "flat-per-floor",
      mechanics: {
        systemType: "leveled-rpg",
        attributes: [{ id: "MIGHT" }],
        progression: { leveling: { type: "flat" } },
      },
    })
    expect(parsed.systemType).toBe("leveled-rpg")
    expect(parseRulebookMechanics(parsed)?.progression?.leveling.type).toBe("flat")
  })
})
