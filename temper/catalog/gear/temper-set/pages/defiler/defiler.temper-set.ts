import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const defiler = {
  id: "019e66e7-6a56-7f70-bb01-3a901eb5d8bd",
  type: "page-type/temper-set",
  slug: "defiler",
  title: "Defiler",
  key: "defiler",
  esoSetId: 321,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
