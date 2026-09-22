import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const radiantBastion = {
  id: "019e66e7-6a7d-776a-a67e-35cf3a094c05",
  type: "page-type/temper-set",
  slug: "radiant-bastion",
  title: "Radiant Bastion",
  key: "radiant-bastion",
  esoSetId: 536,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
