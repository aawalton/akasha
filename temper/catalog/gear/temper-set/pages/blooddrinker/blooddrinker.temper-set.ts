import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blooddrinker = {
  id: "019e66e6-a063-783b-890a-c9c5b6e18419",
  type: "page-type/temper-set",
  slug: "blooddrinker",
  title: "Blooddrinker",
  key: "blooddrinker",
  esoSetId: 339,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
