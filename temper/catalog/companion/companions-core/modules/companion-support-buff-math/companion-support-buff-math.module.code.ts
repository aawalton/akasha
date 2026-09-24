import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import { companionMetrics } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"

export function getCritChancePercent(metricValues: Map<CompanionMetricId, number>): number {
  const critMetric = companionMetrics.data["companion-critical-chance"]
  if (critMetric.valueType !== "rating") {
    throw new Error("companion-critical-chance is no rating, so it has no crit chance")
  }
  const critRating = metricValues.get("companion-critical-chance")
  if (critRating === undefined) {
    throw new Error("The crit chance names companion-critical-chance, which has no value")
  }
  return convertRatingToChance(
    critRating,
    critMetric.divisor,
    critMetric.cap,
    critMetric.ratingFloorIncrement
  )
}

export function accumulateDamageBuffDelta(
  buff: string,
  value: number | undefined,
  valueType: string | undefined,
  uptime: number,
  critChancePercent: number
): number {
  if (valueType !== "fractional-change" || typeof value !== "number") return 0

  if (
    buff === "major-berserk" ||
    buff === "minor-berserk" ||
    buff === "major-brutality" ||
    buff === "minor-brutality" ||
    buff === "major-sorcery" ||
    buff === "minor-sorcery" ||
    buff === "minor-slayer"
  ) {
    return value * uptime
  }

  if (buff === "major-force" || buff === "minor-force") {
    return value * critChancePercent * uptime
  }

  return 0
}
