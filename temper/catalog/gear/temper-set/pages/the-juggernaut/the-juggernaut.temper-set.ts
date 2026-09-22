import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theJuggernaut = {
  id: "019e66ec-796e-7dfb-b927-e234c3eae100",
  type: "page-type/temper-set",
  slug: "the-juggernaut",
  title: "The Juggernaut",
  key: "the-juggernaut",
  esoSetId: 63,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
