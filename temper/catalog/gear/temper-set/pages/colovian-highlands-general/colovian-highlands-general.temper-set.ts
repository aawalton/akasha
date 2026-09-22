import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const colovianHighlandsGeneral = {
  id: "019e66ec-769f-7bce-a8b6-09534d0e3ac2",
  type: "page-type/temper-set",
  slug: "colovian-highlands-general",
  title: "Colovian Highlands General",
  key: "colovian-highlands-general",
  esoSetId: 711,
  category: "temper-set-category/pvp",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
