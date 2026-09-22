import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const auroransThunder = {
  id: "019e66e6-a05c-73a2-9f28-66af896f0877",
  type: "page-type/temper-set",
  slug: "aurorans-thunder",
  title: "Auroran's Thunder",
  key: "aurorans-thunder",
  esoSetId: 435,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
