import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theShadowQueensCowl = {
  id: "019e6484-603e-7edf-ad1e-77078ad38917",
  type: "page-type/temper-set",
  slug: "the-shadow-queens-cowl",
  title: "The Shadow Queen's Cowl",
  key: "the-shadow-queens-cowl",
  esoSetId: 761,
  category: "temper-set-category/mythic",
  valid: ["head:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
