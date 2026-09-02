import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const vigorous = {
  id: "01a05fce-c4b1-7ee6-a23d-dede085d0557",
  pageTypeSlug: "temper-companion-trait",
  slug: "vigorous",
  key: "vigorous",
  title: "Vigorous",
  description: "Increases companion Maximum Health",
  metricId: "companion-health-maximum",
  type: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
