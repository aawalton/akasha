import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const preciseRegeneration = {
  id: "019e6484-5fcf-7fee-acbe-243d8e91c637",
  type: "page-type/temper-set",
  slug: "precise-regeneration",
  title: "Precise Regeneration",
  key: "precise-regeneration",
  esoSetId: 374,
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
