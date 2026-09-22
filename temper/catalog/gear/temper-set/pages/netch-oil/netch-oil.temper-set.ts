import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const netchOil = {
  id: "019e66ec-7829-70c8-a276-25554a5919e7",
  type: "page-type/temper-set",
  slug: "netch-oil",
  title: "Netch Oil",
  key: "netch-oil",
  esoSetId: 793,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
