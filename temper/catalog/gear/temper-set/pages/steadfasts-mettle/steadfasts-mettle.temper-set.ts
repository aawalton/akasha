import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const steadfastsMettle = {
  id: "019e66e7-6a91-7c59-9dfa-6803036c47e2",
  type: "page-type/temper-set",
  slug: "steadfasts-mettle",
  title: "Steadfast's Mettle",
  key: "steadfasts-mettle",
  esoSetId: 644,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
