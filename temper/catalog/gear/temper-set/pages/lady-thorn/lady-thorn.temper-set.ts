import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ladyThorn = {
  id: "019e6484-6002-7c80-bb71-087c7aef4e4f",
  type: "page-type/temper-set",
  slug: "lady-thorn",
  title: "Lady Thorn",
  key: "lady-thorn",
  esoSetId: 535,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
