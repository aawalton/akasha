import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const salvation = {
  id: "019e66e7-6a82-7466-8bd0-24cf090142cd",
  type: "page-type/temper-set",
  slug: "salvation",
  title: "Salvation",
  key: "salvation",
  esoSetId: 99,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
