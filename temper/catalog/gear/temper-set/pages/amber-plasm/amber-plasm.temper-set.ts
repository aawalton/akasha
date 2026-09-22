import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const amberPlasm = {
  id: "019e66e6-a056-71ef-bf01-a3f69806e63c",
  type: "page-type/temper-set",
  slug: "amber-plasm",
  title: "Amber Plasm",
  key: "amber-plasm",
  esoSetId: 258,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
