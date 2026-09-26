import { companionMetrics } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"

export function companionArmorMitigation(armor: number): number {
  const stat = companionMetrics().data["companion-armor"]
  if (stat.valueType !== "rating") {
    throw new Error(`the companion armor stat page is a ${stat.valueType}, and armor is a rating`)
  }
  return convertRatingToChance(armor, stat.divisor, stat.cap)
}
