import { describe, expect, test } from "bun:test"
import { bankAccrual, normalizeGameState, trainCost, withLatches } from "./core/accrual"
import { type GachaGirl, type GameState, type Teammate } from "./core/types"
import { commitIntent } from "./idle-apply"
import { parseIdleSave } from "./idle-save"

const NOW = 5_000_000
const TEST_SLUGS = ["aura", "abby", "aelwyn"] as const

const TEST_TEAMMATES: readonly Teammate[] = TEST_SLUGS.map((slug) => ({
  slug,
  name: slug,
  color: "#fff",
  portrait: "p",
  flavor: "f",
  cost: 0,
  rate: 10,
  rank: 1,
  level: null,
  stage: "s",
}))

function roster(slugs: readonly string[]): {
  girls: Record<string, GachaGirl>
  cycleDraws: number
} {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function makeState(resource: number, overrides: Partial<GameState> = {}): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource,
      teammates: TEST_TEAMMATES,
      lastTickAt: NOW,
      synergyMatrix: {},
      gacha: roster(TEST_SLUGS),
      ranksZeroIndexed: true,
      ...overrides,
    })
  )
}

function rankOf(state: GameState, slug: string): number {
  return state.teammates.find((t) => t.slug === slug)?.rank ?? -1
}

describe("commitIntent", () => {
  test("a single train applies rank +1 and the exact resource spend, outcome applied", () => {
    const server = makeState(100_000)
    const banked = withLatches(bankAccrual(server, NOW))
    const first = banked.teammates[0]
    if (first === undefined) throw new Error("fixture has teammates")
    const cost = trainCost(first)
    const { state, outcome } = commitIntent(server, { type: "train", slug: "aura" }, NOW)
    expect(outcome.applied).toBe(true)
    expect(rankOf(state, "aura")).toBe(2)
    expect(state.resource).toBe(banked.resource - cost)
  })

  test("an unaffordable train is a no-op (rank unchanged) reporting a reason", () => {
    const server = makeState(0)
    const { state, outcome } = commitIntent(server, { type: "train", slug: "aura" }, NOW)
    expect(outcome.applied).toBe(false)
    expect(outcome.reason).toBe("insufficient")
    expect(rankOf(state, "aura")).toBe(1)
  })

  test("banks accrual to `now` BEFORE the affordability check, exactly as the server did", () => {
    const server = makeState(0, { lastTickAt: NOW - 60_000 })
    const banked = withLatches(bankAccrual(server, NOW))
    const first = banked.teammates[0]
    if (first === undefined) throw new Error("fixture has teammates")
    const cost = trainCost(first)
    const affordable = banked.resource >= cost
    const { state, outcome } = commitIntent(server, { type: "train", slug: "aura" }, NOW)
    expect(rankOf(state, "aura")).toBe(affordable ? 2 : 1)
    expect(outcome.applied).toBe(affordable)
  })

  test("a team intent sets the active lineup order", () => {
    const server = makeState(0)
    const { state, outcome } = commitIntent(
      server,
      { type: "team", members: ["abby", "aura"] },
      NOW
    )
    expect(outcome.applied).toBe(true)
    expect(state.activeTeam).toEqual(["abby", "aura"])
  })
})
