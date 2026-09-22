import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ysgramorsBirthright = {
  id: "019e66e7-6ab9-710b-b35c-a3be572b3d3e",
  type: "page-type/temper-set",
  slug: "ysgramors-birthright",
  title: "Ysgramor's Birthright",
  key: "ysgramors-birthright",
  esoSetId: 294,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
