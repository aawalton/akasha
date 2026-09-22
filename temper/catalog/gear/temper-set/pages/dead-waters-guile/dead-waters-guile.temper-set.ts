import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deadWatersGuile = {
  id: "019e66e7-6a54-7964-a992-7661e3be7293",
  type: "page-type/temper-set",
  slug: "dead-waters-guile",
  title: "Dead-Water's Guile",
  key: "dead-waters-guile",
  esoSetId: 406,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
