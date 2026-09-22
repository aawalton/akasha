import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const monomythReforged = {
  id: "019e66e7-6a12-7f86-a40a-91390da3f7e2",
  type: "page-type/temper-set",
  slug: "monomyth-reforged",
  title: "Monomyth Reforged",
  key: "monomyth-reforged",
  esoSetId: 813,
  category: "temper-set-category/no-type",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
