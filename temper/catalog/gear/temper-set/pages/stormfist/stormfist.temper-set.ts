import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stormfist = {
  id: "019e6484-601b-7339-ae53-03e22f3a2469",
  type: "page-type/temper-set",
  slug: "stormfist",
  title: "Stormfist",
  key: "stormfist",
  esoSetId: 275,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
