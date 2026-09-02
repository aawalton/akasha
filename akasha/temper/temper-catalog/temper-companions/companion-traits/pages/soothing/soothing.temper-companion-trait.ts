import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const soothing = {
  id: "01a05fce-c4b1-7c18-9828-60ac8b4aafa2",
  pageTypeSlug: "temper-companion-trait",
  slug: "soothing",
  key: "soothing",
  title: "Soothing",
  description: "Increases companion healing done",
  metricId: "companion-healing-done",
  type: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
