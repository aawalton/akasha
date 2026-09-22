import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const baronZaudrus = {
  id: "019e6484-5fef-7b86-aa10-e5cf9040a4a4",
  type: "page-type/temper-set",
  slug: "baron-zaudrus",
  title: "Baron Zaudrus",
  key: "baron-zaudrus",
  esoSetId: 578,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
