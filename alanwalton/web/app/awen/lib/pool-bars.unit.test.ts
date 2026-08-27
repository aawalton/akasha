import { describe, expect, test } from "bun:test"
import type { PoolPresentation } from "@alanwalton/awen-core/game-schema"
import type { ClientHud } from "./client-session"
import { computePoolBars } from "./pool-bars"

const TOWER_POOLS: readonly PoolPresentation[] = [
  { key: "hp", label: "VITAE", color: "red", max: "hpMax" },
  { key: "focus", label: "FOCUS", color: "blue", max: "focusMax" },
  { key: "stamina", label: "STAMINA", color: "green", max: "stamMax" },
]

describe("computePoolBars", () => {
  test("pairs each pool with its max, color, label, and delta", () => {
    const hud: ClientHud = {
      level: 6,
      pools: {
        hp: 118,
        focus: 110,
        hpMax: 124,
        focusMax: 120,
        stamina: 60,
        stamMax: 76,
        attrPoints: 0,
      },
      delta: { hp: -6, focus: 32, stamina: 14 },
    }
    const bars = computePoolBars(hud, TOWER_POOLS)
    expect(bars.map((b) => b.label)).toEqual(["VITAE", "FOCUS", "STAMINA"])
    expect(bars.map((b) => b.color)).toEqual(["red", "blue", "green"])
    expect(bars[0]?.cur).toBe(118)
    expect(bars[0]?.max).toBe(124)
    expect(bars[0]?.delta).toBe(-6)
    expect(bars[0]?.pct).toBeCloseTo((100 * 118) / 124, 5)
    expect(bars).toHaveLength(3)
  })

  test("skips a presentation entry whose key has no live value", () => {
    const hud: ClientHud = { pools: { focus: 110, focusMax: 120 } }
    const bars = computePoolBars(hud, TOWER_POOLS)
    expect(bars.map((b) => b.key)).toEqual(["focus"])
  })

  test("a missing max yields an uncapped bar at 0%", () => {
    const hud: ClientHud = { pools: { hp: 50 } }
    const bars = computePoolBars(hud, TOWER_POOLS)
    expect(bars).toHaveLength(1)
    expect(bars[0]?.max).toBeUndefined()
    expect(bars[0]?.pct).toBe(0)
  })

  test("clamps fill to 100% when current exceeds max", () => {
    const hpOnly: readonly PoolPresentation[] = [
      { key: "hp", label: "VITAE", color: "red", max: "hpMax" },
    ]
    const hud: ClientHud = { pools: { hp: 200, hpMax: 100 } }
    const bars = computePoolBars(hud, hpOnly)
    expect(bars[0]?.pct).toBe(100)
  })

  test("empty presentation produces no bars", () => {
    const hud: ClientHud = { pools: { hp: 118, hpMax: 124 } }
    expect(computePoolBars(hud, [])).toEqual([])
  })
})
