import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const focused = {
  id: "01a05fce-c4af-7d13-ad7c-a7e9b1934c38",
  type: "page-type/temper-companion-trait",
  slug: "focused",
  key: "focused",
  title: "Focused",
  description: "Increases companion Critical Strike rating",
  metricId: "temper-companion-passive-metric/companion-critical-chance",
  effectType: "integer",
  isReduction: false,
} as const satisfies TemperCompanionTrait
