import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deathDancer = {
  id: "019e66e7-6a01-7f7c-a056-a423f88159ab",
  type: "page-type/temper-set",
  slug: "death-dancer",
  title: "Death-Dancer",
  key: "death-dancer",
  esoSetId: 806,
  category: "temper-set-category/no-type",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
