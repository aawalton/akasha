import { describe, expect, test } from "bun:test"
import { resolveAction } from "./resolve-action"
import type { ActionInput, Sheet } from "./types"

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

const baseInput: ActionInput = {
  attacker,
  defender,
  mode: "phys",
  baseDamage: 10,
  intent: 5,
  gate: 3,
  seed: 104729,
}

describe("resolveAction determinism (acceptance)", () => {
  test("same (seed + state) yields byte-identical roll and result", () => {
    const a = resolveAction(baseInput)
    const b = resolveAction(baseInput)
    expect(b).toEqual(a)
    expect(b.roll).toEqual(a.roll)
    expect(b.line).toBe(a.line)
  })

  test("a different seed produces a different roll", () => {
    const a = resolveAction(baseInput)
    const c = resolveAction({ ...baseInput, seed: 7919 })
    expect(c.roll).not.toEqual(a.roll)
  })

  test("every roll is recorded in the result", () => {
    const r = resolveAction(baseInput)
    expect(r.roll.dice.length).toBeGreaterThan(0)
    expect(r.roll.total).toBe(r.roll.dice.reduce((s, d) => s + d, 0))
    expect(r.roll.mode).toBe("1d20")
  })

  test("a fixed seed reproduces an exact known result (regression pin)", () => {
    const r = resolveAction(baseInput)
    expect(r.roll.dice).toEqual([2])
    expect(r.effectiveScore).toBe(54)
    expect(r.margin).toBe(46)
    expect(r.damage).toBe(145)
    expect(r.hit).toBe(true)
  })
})

describe("resolveAction mechanics (preserved exactly)", () => {
  test("intent is clamped to 0..10", () => {
    expect(resolveAction({ ...baseInput, intent: 50 }).intent).toBe(10)
    expect(resolveAction({ ...baseInput, intent: -5 }).intent).toBe(0)
  })

  test("gate defaults to 1.0 when omitted and is clamped to >= 0", () => {
    const { gate: _g, ...noGate } = baseInput
    expect(resolveAction(noGate).gate).toBe(1)
    expect(resolveAction({ ...baseInput, gate: -2 }).gate).toBe(0)
  })

  test("gate multiplies base damage before margin-scaling", () => {
    const g1 = resolveAction({ ...baseInput, gate: 1 })
    const g3 = resolveAction({ ...baseInput, gate: 3 })
    expect(g3.roll).toEqual(g1.roll)
    expect(g1.damage).toBe(48)
    expect(g3.damage).toBe(145)
  })

  test("mental attacks resolve against mentDef with the INT/WILL power", () => {
    const phys = resolveAction({ ...baseInput, mode: "phys" })
    const ment = resolveAction({ ...baseInput, mode: "ment" })
    expect(ment.attackPower).toBe(35.6)
    expect(ment.defense).not.toBe(phys.defense)
  })

  test("the human-readable line carries the combatants and the outcome", () => {
    const r = resolveAction(baseInput)
    expect(r.line).toContain("Alan → Ashling")
    expect(r.line).toContain("1d20")
    expect(r.line).toContain("gate ×3")
  })
})
