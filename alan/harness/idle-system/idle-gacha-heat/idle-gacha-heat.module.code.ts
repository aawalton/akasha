import {
  BLESS_MULT,
  BLOOM_MULT,
  WEATHER_BONUS,
} from "../idle-constants/idle-constants.module.code.ts"
import {
  activeBloomPair,
  activeWeatherSlug,
  blessedSlug,
} from "../idle-dormancy/idle-dormancy.module.code.ts"
import type { GameState } from "../idle-state/idle-state.module.code.ts"

export function hotFactor(slug: string, s: GameState): number {
  let f = 1
  if (activeWeatherSlug(s) === slug) f *= WEATHER_BONUS
  const bloom = activeBloomPair(s)
  if (bloom?.split("+").includes(slug) === true) f *= BLOOM_MULT
  if (blessedSlug(s) === slug) f *= BLESS_MULT
  return f
}
