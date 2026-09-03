import { normalizeGameState } from "@akasha/idle-system/accrual"
import { parseIdleSave } from "@akasha/idle-system/save"
import type { GachaGirl, GameState, SynergyMatrix, Teammate } from "@akasha/idle-system/state"

export const NOW = 1_000_000

const TEST_SLUGS = ["aura", "abby", "aelwyn", "ali", "aine", "amy"] as const

export const TEST_TEAMMATES: readonly Teammate[] = TEST_SLUGS.map((slug) => ({
  slug,
  name: slug,
  color: "var(--primary)",
  portrait: "p",
  flavor: "f",
  cost: 0,
  rate: 10,
  rank: 1,
  level: null,
  stage: "s",
}))

export const TEST_SYNERGY: SynergyMatrix = { "abby+ali": 0.25, "aine+aura": -0.1 }

export function roster(slugs: readonly string[]): {
  girls: Record<string, GachaGirl>
  cycleDraws: number
} {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

export function freshState(resource: number): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource,
      teammates: TEST_TEAMMATES.map((t) => ({ ...t, rank: 0 })),
      lastTickAt: NOW,
      synergyMatrix: TEST_SYNERGY,
      gacha: roster(["aura"]),
      ranksZeroIndexed: true,
    })
  )
}

export function ownedState(rank: number, overrides: Partial<GameState> = {}): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource: 0,
      teammates: TEST_TEAMMATES.map((t) => ({ ...t, rank })),
      lastTickAt: NOW,
      synergyMatrix: TEST_SYNERGY,
      gacha: roster(TEST_TEAMMATES.map((t) => t.slug)),
      ranksZeroIndexed: true,
      ...overrides,
    })
  )
}

export function stateWithImages(): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource: 0,
      teammates: TEST_TEAMMATES,
      lastTickAt: NOW,
      synergyMatrix: TEST_SYNERGY,
      gacha: {
        girls: {
          aura: { stars: 0, dupeProgress: 0, images: [] },
          abby: { stars: 0, dupeProgress: 0, images: ["img-1", "img-2"] },
        },
        cycleDraws: 0,
      },
    })
  )
}
