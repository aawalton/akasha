import type { TemperCompanionPassiveMetric } from "akasha/temper/catalog/companion/passive-metric/temper-companion-passive-metric.page-type.types.ts"

export const companionDamageTaken = {
  id: "01a05fcd-70f9-7343-87c0-2927fd7cdf3a",
  type: "page-type/temper-companion-passive-metric",
  slug: "companion-damage-taken",
  key: "companion-damage-taken",
  title: "Damage Taken",
} as const satisfies TemperCompanionPassiveMetric
