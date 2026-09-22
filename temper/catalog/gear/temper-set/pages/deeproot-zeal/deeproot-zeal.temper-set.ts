import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deeprootZeal = {
  id: "019e66e6-a06f-7ac8-bd6e-e8e90c0b7962",
  type: "page-type/temper-set",
  slug: "deeproot-zeal",
  title: "Deeproot Zeal",
  key: "deeproot-zeal",
  esoSetId: 660,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
