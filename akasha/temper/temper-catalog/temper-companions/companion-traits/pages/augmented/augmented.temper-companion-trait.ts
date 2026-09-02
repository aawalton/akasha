import type { TemperCompanionTrait } from "../../temper-companion-trait.page-type.ts"

export const augmented = {
  id: "01a05fce-c4ae-71a9-94bd-92eaf44306b0",
  pageTypeSlug: "temper-companion-trait",
  slug: "augmented",
  key: "augmented",
  title: "Augmented",
  description: "Increases duration of all companion buffs and debuffs",
  metricId: "companion-buff-duration",
  type: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
