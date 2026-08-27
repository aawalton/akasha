import { describe, expect, test } from "bun:test"
import { resolveAction } from "@alanwalton/tower-engine/resolve-action"
import { type ActionInput, type Sheet } from "@alanwalton/tower-engine/types"
import {
  actionResultToRollPayload,
  parseRollLine,
  parseRollLines,
  TowerRollPayloadSchema,
} from "./roll-payload"

const PERCEPTION_LINE = JSON.stringify({
  turn: 1,
  action: "Search the landing for a weapon",
  attr: "PERCEPTION",
  attrVal: 11,
  intent: 4,
  die: "1d20",
  roll: 12,
  DC: 24,
  score: 27,
  margin: 3,
  result: "modest success — found rusted iron bar (+4 Atk)",
  shown: false,
})

const COMBAT_LINE = JSON.stringify({
  turn: 3,
  action: "braced two-handed power-strike to the core",
  mode: "phys",
  attackPower: 33.5,
  intent: 8,
  die: "1d20",
  seed: 1782304673,
  roll: 16,
  defense: 6.5,
  margin: 51,
  baseDamage: 14,
  damage: 74,
  enemyHP: 54,
  gate: 3,
  gatedBase: 42,
  result: "CLEAN KILL",
  shown: false,
})

const TAIL_LINE = JSON.stringify({
  turn: 35,
  result: "clean holding bind",
  shown: false,
  partB_bind: { roll: 15, margin: 24 },
})

describe("TowerRollPayloadSchema", () => {
  test("parses a check roll with its typed core", () => {
    const p = parseRollLine(PERCEPTION_LINE)
    expect(p.turn).toBe(1)
    expect(p.attr).toBe("PERCEPTION")
    expect(p.margin).toBe(3)
    expect(p.shown).toBe(false)
  })

  test("parses a combat roll with combat fields", () => {
    const p = parseRollLine(COMBAT_LINE)
    expect(p.mode).toBe("phys")
    expect(p.damage).toBe(74)
    expect(p.gate).toBe(3)
    expect(p.seed).toBe(1782304673)
  })

  test("absorbs the heterogeneous roll/intent/gate shapes from the live log", () => {
    const objectRoll = TowerRollPayloadSchema.parse({
      turn: 72,
      result: "drilling",
      roll: { mode: "1d20", dice: [9], total: 9, crit: false, fumble: false },
      intent: "invoke (Journeyman, no contest)",
      gate: "x0.3 in-water (water quenches)",
    })
    expect(objectRoll.intent).toBe("invoke (Journeyman, no contest)")
    expect(objectRoll.gate).toBe("x0.3 in-water (water quenches)")
    expect(Reflect.get(objectRoll, "roll")).toEqual({
      mode: "1d20",
      dice: [9],
      total: 9,
      crit: false,
      fumble: false,
    })
    const proseRoll = TowerRollPayloadSchema.parse({
      turn: 38,
      result: "montage",
      roll: "NONE — montage",
    })
    expect(proseRoll.roll).toBe("NONE — montage")
  })

  test("tolerates explicit null mechanics (a no-dice bookkeeping roll)", () => {
    const p = TowerRollPayloadSchema.parse({
      turn: 41,
      result: "no-dice bookkeeping",
      seed: null,
      roll: null,
      DC: null,
      margin: null,
      intent: null,
      attr: null,
      attrVal: null,
      score: null,
      shown: false,
    })
    expect(p.turn).toBe(41)
    expect(p.seed).toBeNull()
    expect(p.roll).toBeNull()
  })

  test("preserves long-tail one-off keys via passthrough", () => {
    const p = parseRollLine(TAIL_LINE)
    expect(Reflect.get(p, "partB_bind")).toEqual({ roll: 15, margin: 24 })
  })

  test("defaults shown to false (coordinator-only)", () => {
    const p = TowerRollPayloadSchema.parse({ turn: 1, result: "x" })
    expect(p.shown).toBe(false)
  })

  test("parses a multi-line rolls.jsonl blob, skipping blanks", () => {
    const blob = `${PERCEPTION_LINE}\n\n${COMBAT_LINE}\n`
    const rolls = parseRollLines(blob)
    expect(rolls).toHaveLength(2)
    expect(rolls[1]?.damage).toBe(74)
  })
})

const attacker: Sheet = {
  name: "Alan",
  kind: "player",
  level: 6,
  class: "Loreseeker",
  attributes: {
    MIGHT: 18,
    FINESSE: 14,
    VITALITY: 16,
    INTELLECT: 18,
    PERCEPTION: 14,
    WILL: 14,
    PRESENCE: 10,
    LUCK: 10,
  },
  rollMode: "1d20",
  equipment: { weapon: { atk: 6 } },
}

const defender: Sheet = {
  name: "Ashling",
  kind: "enemy",
  level: 1,
  attributes: {
    MIGHT: 8,
    FINESSE: 8,
    VITALITY: 8,
    INTELLECT: 6,
    PERCEPTION: 8,
    WILL: 6,
    PRESENCE: 6,
    LUCK: 6,
  },
}

const input: ActionInput = {
  attacker,
  defender,
  mode: "phys",
  baseDamage: 10,
  skillBonus: 2,
  intent: 4,
  seed: 1782303112,
}

describe("actionResultToRollPayload", () => {
  test("maps an engine result into the stable roll-payload core", () => {
    const result = resolveAction(input)
    const payload = actionResultToRollPayload(input, result, { turn: 57, action: "Strike" })

    expect(payload.turn).toBe(57)
    expect(payload.action).toBe("Strike")
    expect(payload.result).toBe(result.line)
    expect(payload.seed).toBe(input.seed)
    expect(payload.die).toBe(result.roll.mode)
    expect(payload.roll).toBe(result.roll.total)
    expect(payload.intent).toBe(result.intent)
    expect(payload.mode).toBe("phys")
    expect(payload.baseDamage).toBe(10)
    expect(payload.skillBonus).toBe(result.skillBonus)
    expect(payload.score).toBe(result.effectiveScore)
    expect(payload.margin).toBe(result.margin)
    expect(payload.damage).toBe(result.damage)
  })

  test("is coordinator-only by construction (shown=false) and a valid roll payload", () => {
    const result = resolveAction(input)
    const payload = actionResultToRollPayload(input, result, { turn: 57 })

    expect(payload.shown).toBe(false)
    expect(() => TowerRollPayloadSchema.parse(payload)).not.toThrow()
  })

  test("omits the action label when none is supplied", () => {
    const result = resolveAction(input)
    const payload = actionResultToRollPayload(input, result, { turn: 57 })
    expect(payload.action).toBeUndefined()
  })

  test("never carries coordinator/loop-dark fields (only engine math + label)", () => {
    const result = resolveAction(input)
    const payload = actionResultToRollPayload(input, result, { turn: 57, action: "Strike" })
    const keys = Object.keys(payload)
    for (const forbidden of ["designerNotes", "loop", "source", "effect"]) {
      expect(keys).not.toContain(forbidden)
    }
  })

  test("is deterministic — same inputs produce the same payload", () => {
    const a = actionResultToRollPayload(input, resolveAction(input), { turn: 57, action: "Strike" })
    const b = actionResultToRollPayload(input, resolveAction(input), { turn: 57, action: "Strike" })
    expect(a).toEqual(b)
  })
})
