import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dolorousArena = {
  id: "019e66e7-6a03-7280-b9e4-196458e0eb41",
  type: "page-type/temper-set",
  slug: "dolorous-arena",
  title: "Dolorous Arena",
  key: "dolorous-arena",
  esoSetId: 816,
  category: "temper-set-category/no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
