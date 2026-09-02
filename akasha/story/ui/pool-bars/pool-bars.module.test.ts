import { describe, expect, test } from "bun:test"
import type { PoolPresentation } from "@akasha/story-engine-core/game-schema"
import { computePoolBars } from "./pool-bars.module.code.ts"

const VITAE: PoolPresentation = { key: "vitae", label: "Vitae", color: "red", max: "vitaeMax" }

describe("computePoolBars", () => {
  test("fills a bar to the share of its max", () => {
    const bars = computePoolBars({ pools: { vitae: 25, vitaeMax: 100 } }, [VITAE])
    expect(bars).toEqual([
      { key: "vitae", label: "Vitae", color: "red", cur: 25, max: 100, pct: 25, delta: undefined },
    ])
  })

  test("leaves a bar empty when no max is named", () => {
    const bars = computePoolBars({ pools: { vitae: 25 } }, [
      { key: "vitae", label: "Vitae", color: "red" },
    ])
    expect(bars[0]?.pct).toBe(0)
    expect(bars[0]?.max).toBeUndefined()
  })

  test("leaves a bar empty when the max is zero or below", () => {
    expect(computePoolBars({ pools: { vitae: 5, vitaeMax: 0 } }, [VITAE])[0]?.pct).toBe(0)
  })

  test("holds the fill between zero and a hundred", () => {
    expect(computePoolBars({ pools: { vitae: 300, vitaeMax: 100 } }, [VITAE])[0]?.pct).toBe(100)
    expect(computePoolBars({ pools: { vitae: -50, vitaeMax: 100 } }, [VITAE])[0]?.pct).toBe(0)
  })

  test("drops a pool the hud holds no number for", () => {
    expect(computePoolBars({ pools: {} }, [VITAE])).toEqual([])
  })

  test("carries the delta the hud holds for the pool", () => {
    const bars = computePoolBars({ pools: { vitae: 10, vitaeMax: 20 }, delta: { vitae: -3 } }, [
      VITAE,
    ])
    expect(bars[0]?.delta).toBe(-3)
  })

  test("is empty when a hud holds no pools at all", () => {
    expect(computePoolBars({}, [VITAE])).toEqual([])
  })
})
