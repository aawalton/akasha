import {
  COLLECTION_PER,
  DRAW_COST_BASE,
  DRAW_COST_GROWTH,
  STAR_PER,
  STAR_THRESHOLDS,
} from "../idle-constants/idle-constants.module.code.ts"
import type { GachaGirl, GameState, Teammate } from "../idle-state/idle-state.module.code.ts"

export function isUnlocked(s: GameState, slug: string): boolean {
  return s.gacha.girls[slug] !== undefined
}

export function unlockedTeammates(s: GameState): readonly Teammate[] {
  return s.teammates.filter((t) => isUnlocked(s, t.slug))
}

export function starMultMap(s: GameState): Record<string, number> {
  const map: Record<string, number> = {}
  for (const [slug, girl] of Object.entries(s.gacha.girls)) {
    if (girl.stars > 0) map[slug] = 1 + girl.stars * STAR_PER
  }
  return map
}

export function collectionBonus(s: GameState): number {
  let unique = 0
  for (const girl of Object.values(s.gacha.girls)) unique += girl.images.length
  return unique * COLLECTION_PER
}

export function drawCost(s: GameState): number {
  return Math.ceil(DRAW_COST_BASE * DRAW_COST_GROWTH ** s.gacha.cycleDraws)
}

export function nextStarThreshold(stars: number): number | null {
  return stars < STAR_THRESHOLDS.length ? (STAR_THRESHOLDS[stars] ?? null) : null
}

export function applyDupeFuel(girl: GachaGirl): { girl: GachaGirl; starUp: boolean } {
  if (girl.stars >= STAR_THRESHOLDS.length) {
    return { girl: { ...girl, dupeProgress: 0 }, starUp: false }
  }
  let stars = girl.stars
  let progress = girl.dupeProgress + 1
  let starUp = false
  let need = STAR_THRESHOLDS[stars] ?? Number.POSITIVE_INFINITY
  while (stars < STAR_THRESHOLDS.length && progress >= need) {
    progress -= need
    stars += 1
    starUp = true
    need = STAR_THRESHOLDS[stars] ?? Number.POSITIVE_INFINITY
  }
  if (stars >= STAR_THRESHOLDS.length) progress = 0
  return { girl: { ...girl, stars, dupeProgress: progress }, starUp }
}
