import { describe, expect, test } from "bun:test"
import { rng, roll1d20, roll2d10, rollFor } from "./rng"
import type { Sheet } from "./types"

describe("rng (mulberry32, seeded)", () => {
  test("the same seed reproduces the same sequence", () => {
    const a = rng(12345)
    const b = rng(12345)
    const seqA = [a(), a(), a(), a()]
    const seqB = [b(), b(), b(), b()]
    expect(seqB).toEqual(seqA)
  })

  test("different seeds diverge", () => {
    const a = rng(1)
    const b = rng(2)
    expect(a()).not.toBe(b())
  })

  test("values are in [0, 1)", () => {
    const next = rng(98765)
    for (let i = 0; i < 200; i++) {
      const v = next()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe("roll2d10 (bell curve, 2..20)", () => {
  test("two max dice → total 20 → crit", () => {
    const r = roll2d10(() => 0.95)
    expect(r.dice).toEqual([10, 10])
    expect(r.total).toBe(20)
    expect(r.crit).toBe(true)
    expect(r.fumble).toBe(false)
  })

  test("two min dice → total 2 → fumble", () => {
    const r = roll2d10(() => 0)
    expect(r.dice).toEqual([1, 1])
    expect(r.total).toBe(2)
    expect(r.fumble).toBe(true)
    expect(r.crit).toBe(false)
  })

  test("a mid roll is neither crit nor fumble", () => {
    const r = roll2d10(() => 0.5)
    expect(r.total).toBeGreaterThanOrEqual(2)
    expect(r.total).toBeLessThanOrEqual(20)
    expect(r.crit).toBe(false)
    expect(r.fumble).toBe(false)
  })
})

describe("roll1d20 (Wild Variance, 1..20)", () => {
  test("natural 20 → crit", () => {
    const r = roll1d20(() => 0.99)
    expect(r.dice).toEqual([20])
    expect(r.total).toBe(20)
    expect(r.crit).toBe(true)
    expect(r.fumble).toBe(false)
  })

  test("natural 1 → fumble", () => {
    const r = roll1d20(() => 0)
    expect(r.dice).toEqual([1])
    expect(r.total).toBe(1)
    expect(r.fumble).toBe(true)
    expect(r.crit).toBe(false)
  })
})

describe("rollFor (selects mode from the sheet)", () => {
  const base: Sheet = {
    name: "x",
    kind: "enemy",
    level: 1,
    attributes: {
      MIGHT: 8,
      FINESSE: 8,
      VITALITY: 8,
      INTELLECT: 8,
      PERCEPTION: 8,
      WILL: 8,
      PRESENCE: 8,
      LUCK: 8,
    },
  }

  test("defaults to 2d10 when rollMode is unset", () => {
    const r = rollFor(base, () => 0.5)
    expect(r.mode).toBe("2d10")
    expect(r.dice.length).toBe(2)
  })

  test("uses 1d20 when the sheet asks for Wild Variance", () => {
    const r = rollFor({ ...base, rollMode: "1d20" }, () => 0.5)
    expect(r.mode).toBe("1d20")
    expect(r.dice.length).toBe(1)
  })
})
