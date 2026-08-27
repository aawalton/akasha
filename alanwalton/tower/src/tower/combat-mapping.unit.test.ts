import { describe, expect, it } from "bun:test"
import type { Hud } from "@alanwalton/tower-core/revealed-sheet"
import { type GameCharacterSheet, GameCharacterSheetSchema } from "@alanwalton/tower-core/character-schema"
import { type FloorEnemy, FloorEnemySchema } from "@alanwalton/tower-core/floor-schema"
import { derive } from "@alanwalton/tower-engine/derive"
import { resolveAction } from "@alanwalton/tower-engine/resolve-action"
import { applyActionDamage, toCombatSheet } from "./combat-mapping"

const ALAN: GameCharacterSheet = GameCharacterSheetSchema.parse({
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
  equipment: { weapon: { name: "Burning Anger", atk: 10 }, armor: { name: "cloak", def: 1 } },
})

const ASHLING: FloorEnemy = FloorEnemySchema.parse({
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
  readableTrait: "core is the kill",
  hpNote: "VIT8+MIGHT2 = 54 HP",
})

describe("toCombatSheet — canonical character", () => {
  it("carries the durable engine fields", () => {
    const s = toCombatSheet(ALAN)
    expect(s.name).toBe("Alan")
    expect(s.kind).toBe("player")
    expect(s.level).toBe(6)
    expect(s.rollMode).toBe("1d20")
    expect(s.attributes.INTELLECT).toBe(20)
    expect(s.equipment?.weapon?.atk).toBe(10)
    expect(s.equipment?.armor?.def).toBe(1)
    expect(s.skills?.[0]).toEqual({ id: "ember-channel", name: "Ember Channel" })
  })

  it("feeds the engine derive() — HP = VIT*8 + MIGHT*2", () => {
    const d = derive(toCombatSheet(ALAN))
    expect(d.hpMax).toBe(12 * 8 + 14 * 2)
  })
})

describe("toCombatSheet — inline floor enemy", () => {
  it("maps the enemy and drops combat-tuning fields", () => {
    const s = toCombatSheet(ASHLING)
    expect(s.name).toBe("Ashling")
    expect(s.kind).toBe("enemy")
    expect(s.equipment?.weapon?.atk).toBe(0)
    expect("baseDamage" in s).toBe(false)
    expect("readableTrait" in s).toBe(false)
  })

  it("derive() matches the floor hpNote (VIT8+MIGHT2 = 54)", () => {
    expect(derive(toCombatSheet(ASHLING)).hpMax).toBe(5 * 8 + 7 * 2)
  })

  it("round-trips through resolveAction deterministically", () => {
    const a = resolveAction({
      attacker: toCombatSheet(ALAN),
      defender: toCombatSheet(ASHLING),
      mode: "phys",
      baseDamage: 14,
      intent: 8,
      gate: 3,
      seed: 1782304673,
    })
    const b = resolveAction({
      attacker: toCombatSheet(ALAN),
      defender: toCombatSheet(ASHLING),
      mode: "phys",
      baseDamage: 14,
      intent: 8,
      gate: 3,
      seed: 1782304673,
    })
    expect(a.damage).toBe(b.damage)
    expect(a.hit).toBe(true)
  })
})

describe("applyActionDamage — engine result → session HUD", () => {
  it("reduces hp clamped at 0 and records the signed delta", () => {
    const hud: Hud = {
      level: 6,
      hp: 118,
      hpMax: 124,
      focus: 110,
      focusMax: 120,
      stamina: 60,
      stamMax: 76,
    }
    const next = applyActionDamage(hud, 30)
    expect(next.hp).toBe(88)
    expect(next.delta?.hp).toBe(-30)
    expect(applyActionDamage(hud, 999).hp).toBe(0)
  })
})
