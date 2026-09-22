import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armsOfTheAncestors = {
  id: "019e6484-6048-741b-b539-5ae38154b1ca",
  type: "page-type/temper-set",
  slug: "arms-of-the-ancestors",
  title: "Arms of the Ancestors",
  key: "arms-of-the-ancestors",
  esoSetId: 121,
  category: "temper-set-category/other",
  valid: ["bow", "ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
