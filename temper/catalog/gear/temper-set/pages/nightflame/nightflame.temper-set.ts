import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nightflame = {
  id: "019e6484-600d-7087-84f6-b5f4d5163da7",
  type: "page-type/temper-set",
  slug: "nightflame",
  title: "Nightflame",
  key: "nightflame",
  esoSetId: 167,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
