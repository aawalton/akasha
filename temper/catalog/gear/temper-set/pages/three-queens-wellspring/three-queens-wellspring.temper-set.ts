import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const threeQueensWellspring = {
  id: "019e66e7-6a22-7ba9-a5bc-0d880c8902e8",
  type: "page-type/temper-set",
  slug: "three-queens-wellspring",
  title: "Three Queens Wellspring",
  key: "three-queens-wellspring",
  esoSetId: 805,
  category: "temper-set-category/no-type",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
