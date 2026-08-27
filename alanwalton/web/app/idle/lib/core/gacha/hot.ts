import { BLESS_MULT, BLOOM_MULT, WEATHER_BONUS } from "../constants"
import { activeBloomPair, activeWeatherSlug, blessedSlug } from "../dormant-bonus"
import type { GameState } from "../types"

export function hotFactor(slug: string, s: GameState): number {
  let f = 1
  if (activeWeatherSlug(s) === slug) f *= WEATHER_BONUS
  const bloom = activeBloomPair(s)
  if (bloom?.split("+").includes(slug) === true) f *= BLOOM_MULT
  if (blessedSlug(s) === slug) f *= BLESS_MULT
  return f
}
