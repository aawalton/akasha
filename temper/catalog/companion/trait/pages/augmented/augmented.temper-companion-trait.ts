import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const augmented = {
  id: "01a05fce-c4ae-71a9-94bd-92eaf44306b0",
  type: "page-type/temper-companion-trait",
  slug: "augmented",
  key: "augmented",
  title: "Augmented",
  description: "Increases duration of all companion buffs and debuffs",
  metricId: "temper-companion-passive-metric/companion-buff-duration",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: "jsonl",
} as const satisfies TemperCompanionTrait
