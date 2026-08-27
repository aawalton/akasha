import { describe, expect, test } from "bun:test"
import scratchState from "../__fixtures__/scratch-state.json"
import { parseIdleSave, toJsonSave } from "../idle-save"
import { bankAccrual, normalizeGameState, withLatches } from "./accrual"
import { totalRate } from "./rate"

const GOLDEN_TOTAL_RATE = 2533.9860000000003

describe("idle pure-core — scratch parity", () => {
  test("totalRate over the live fixture equals the scratch golden", () => {
    const state = normalizeGameState(parseIdleSave(scratchState))
    expect(totalRate(state)).toBe(GOLDEN_TOTAL_RATE)
  })

  test("normalizeGameState preserves every save field (lossless bridge)", () => {
    const save = parseIdleSave(scratchState)
    const state = normalizeGameState(save)
    for (const key of Object.keys(save)) {
      expect(state).toHaveProperty(key)
    }
  })

  test("bankAccrual grows resource by rate × elapsed and stamps lastTickAt", () => {
    const state = normalizeGameState(parseIdleSave(scratchState))
    const rate = totalRate(state)
    const now = state.lastTickAt + 10_000
    const banked = bankAccrual(state, now)
    expect(banked.resource).toBeCloseTo(state.resource + rate * 10, 6)
    expect(banked.lastTickAt).toBe(now)
  })

  test("bankAccrual write-back drops no field (dormant-latch structure intact)", () => {
    const save = parseIdleSave(scratchState)
    const state = normalizeGameState(save)
    const banked = bankAccrual(state, state.lastTickAt + 10_000)
    for (const key of Object.keys(save)) {
      expect(banked).toHaveProperty(key)
    }
  })

  test("worker write-prep (normalize→bank→withLatches→toJsonSave) is jsonb-safe with a no-affinity teammate", () => {
    const seed = {
      resource: 999.9,
      lastTickAt: 2000,
      teammates: [
        {
          slug: "a",
          name: "A",
          color: "#fff",
          portrait: "p",
          flavor: "f",
          owned: true,
          cost: 1,
          rate: 2,
          rank: 0,
          level: null,
          stage: "s",
        },
      ],
    }
    const state = normalizeGameState(parseIdleSave(seed))
    const banked = withLatches(bankAccrual(state, 1_700_000_000_000))
    expect(() => toJsonSave(parseIdleSave(banked))).not.toThrow()
  })
})
