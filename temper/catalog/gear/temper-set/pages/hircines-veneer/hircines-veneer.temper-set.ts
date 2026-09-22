import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hircinesVeneer = {
  id: "019e66e6-a08e-7bb2-abb4-0017e8855ce6",
  type: "page-type/temper-set",
  slug: "hircines-veneer",
  title: "Hircine's Veneer",
  key: "hircines-veneer",
  esoSetId: 123,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
