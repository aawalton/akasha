import { describe, expect, test } from "bun:test"
import { LEAD_MULT } from "./constants"
import { boostedRateMap, totalRate } from "./rate"
import { type GachaGirl, type GachaState, type GameState, type Teammate } from "./types"

function tm(over: Partial<Teammate> & { slug: string }): Teammate {
  return {
    name: over.slug,
    color: "#fff",
    portrait: "p",
    flavor: "f",
    cost: 0,
    rate: 1,
    rank: 1,
    level: null,
    stage: "s",
    ...over,
  }
}

function rosterState(slugs: readonly string[]): GachaState {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function gs(over: Partial<GameState>): GameState {
  const base: GameState = {
    resource: 0,
    teammates: [],
    lastTickAt: 0,
    gacha: rosterState((over.teammates ?? []).map((t) => t.slug)),
  }
  return { ...base, ...over }
}

describe("boostedRateMap — per-card fully-boosted rate", () => {
  test("Σ boostedRateMap === totalRate when synergy=0 and all globals dormant", () => {
    const teammates = [
      tm({ slug: "aura", rate: 10, rank: 3 }),
      tm({ slug: "abby", rate: 5, rank: 2 }),
    ]
    const s = gs({ teammates, activeTeam: ["aura"] })
    const map = boostedRateMap(s)
    expect(map.aura).toBe(60)
    expect(map.abby).toBe(10)
    const sum = Object.values(map).reduce((a, b) => a + b, 0)
    expect(sum).toBe(totalRate(s))
  })

  test("Lead ×LEAD_MULT is positional (activeTeam[0]), not a stored attribute", () => {
    const teammates = [
      tm({ slug: "aura", rate: 10, rank: 1 }),
      tm({ slug: "abby", rate: 10, rank: 1 }),
    ]
    const lead = boostedRateMap(gs({ teammates, activeTeam: ["aura"] }))
    expect(lead.aura).toBeCloseTo((lead.abby ?? Number.NaN) * LEAD_MULT, 12)

    const swapped = boostedRateMap(gs({ teammates, activeTeam: ["abby"] }))
    expect(swapped.abby).toBeCloseTo((swapped.aura ?? Number.NaN) * LEAD_MULT, 12)
  })

  test("no lead seat ⇒ no ×LEAD_MULT applied to anyone", () => {
    const teammates = [tm({ slug: "aura", rate: 10, rank: 2 })]
    const map = boostedRateMap(gs({ teammates, activeTeam: [] }))
    expect(map.aura).toBe(20)
  })
})
