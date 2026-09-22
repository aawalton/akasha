import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thurvokun = {
  id: "019e6484-601f-7eae-858b-051b4dcf3674",
  type: "page-type/temper-set",
  slug: "thurvokun",
  title: "Thurvokun",
  key: "thurvokun",
  esoSetId: 349,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
