import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const vigorous = {
  id: "01a05fce-c4b1-7ee6-a23d-dede085d0557",
  type: "page-type/temper-companion-trait",
  slug: "vigorous",
  key: "vigorous",
  title: "Vigorous",
  description: "Increases companion Maximum Health",
  metricId: "temper-companion-passive-metric/companion-health-maximum",
  effectType: "fractional-change",
  isReduction: false,
} as const satisfies TemperCompanionTrait
