import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shadowDancersRaiment = {
  id: "019e66e7-6a87-712a-9e3e-1e5ba25021fb",
  type: "page-type/temper-set",
  slug: "shadow-dancers-raiment",
  title: "Shadow Dancer's Raiment",
  key: "shadow-dancers-raiment",
  esoSetId: 64,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
