import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const maraudersHaste = {
  id: "019e66e7-6a6e-7fae-a220-4bf8ec9e5c66",
  type: "page-type/temper-set",
  slug: "marauders-haste",
  title: "Marauder's Haste",
  key: "marauders-haste",
  esoSetId: 466,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
