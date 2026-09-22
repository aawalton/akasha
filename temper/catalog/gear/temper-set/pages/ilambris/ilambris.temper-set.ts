import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ilambris = {
  id: "019e6484-5ffb-7fb2-b363-b681369b1a02",
  type: "page-type/temper-set",
  slug: "ilambris",
  title: "Ilambris",
  key: "ilambris",
  esoSetId: 273,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
