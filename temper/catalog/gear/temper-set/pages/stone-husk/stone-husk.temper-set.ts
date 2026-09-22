import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stoneHusk = {
  id: "019e6484-6019-7596-b603-551f7c9b0d59",
  type: "page-type/temper-set",
  slug: "stone-husk",
  title: "Stone Husk",
  key: "stone-husk",
  esoSetId: 534,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
