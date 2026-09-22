import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const molagKena = {
  id: "019e6484-6008-7ca5-9aab-b19eb4cf77f1",
  type: "page-type/temper-set",
  slug: "molag-kena",
  title: "Molag Kena",
  key: "molag-kena",
  esoSetId: 183,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
