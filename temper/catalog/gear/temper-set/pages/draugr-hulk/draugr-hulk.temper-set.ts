import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const draugrHulk = {
  id: "019e66e6-a072-7ccc-afc0-0ff77b738cbf",
  type: "page-type/temper-set",
  slug: "draugr-hulk",
  title: "Draugr Hulk",
  key: "draugr-hulk",
  esoSetId: 307,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
