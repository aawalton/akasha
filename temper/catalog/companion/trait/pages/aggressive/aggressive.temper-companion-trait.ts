import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const aggressive = {
  id: "01a05fce-c4ae-76d4-b0f2-55ebd7f2e20e",
  type: "page-type/temper-companion-trait",
  slug: "aggressive",
  key: "aggressive",
  title: "Aggressive",
  description: "Increases companion damage done",
  metricId: "temper-companion-passive-metric/companion-damage-done",
  effectType: "fractional-change",
  isReduction: false,
} as const satisfies TemperCompanionTrait
