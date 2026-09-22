import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const unchainedAggressor = {
  id: "019e668e-9a70-7e07-b644-085ea51b3c74",
  type: "page-type/temper-set",
  slug: "unchained-aggressor",
  title: "Unchained Aggressor",
  key: "unchained-aggressor",
  esoSetId: 481,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
