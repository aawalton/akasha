import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const soothing = {
  id: "01a05fce-c4b1-7c18-9828-60ac8b4aafa2",
  type: "page-type/temper-companion-trait",
  slug: "soothing",
  key: "soothing",
  title: "Soothing",
  description: "Increases companion healing done",
  metricId: "temper-companion-passive-metric/companion-healing-done",
  effectType: "fractional-change",
  isReduction: false,
} as const satisfies TemperCompanionTrait
