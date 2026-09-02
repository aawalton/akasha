import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const prolific = {
  id: "01a05fce-c4b0-7db1-b613-848e703bbfc8",
  pageTypeSlug: "temper-companion-trait",
  slug: "prolific",
  key: "prolific",
  title: "Prolific",
  description: "Increases companion Ultimate generation",
  metricId: "companion-ultimate-generation",
  type: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
