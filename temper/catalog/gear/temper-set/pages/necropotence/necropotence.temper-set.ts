import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const necropotence = {
  id: "019e66e7-6a73-7bbc-86bc-b8e13d1c522a",
  type: "page-type/temper-set",
  slug: "necropotence",
  title: "Necropotence",
  key: "necropotence",
  esoSetId: 98,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
