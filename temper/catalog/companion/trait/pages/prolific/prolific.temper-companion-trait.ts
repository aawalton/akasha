import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const prolific = {
  id: "01a05fce-c4b0-7db1-b613-848e703bbfc8",
  type: "page-type/temper-companion-trait",
  slug: "prolific",
  key: "prolific",
  title: "Prolific",
  description: "Increases companion Ultimate generation",
  metricId: "temper-companion-passive-metric/companion-ultimate-generation",
  effectType: "fractional-change",
  isReduction: false,
  hashPlace: 5,
} as const satisfies TemperCompanionTrait
