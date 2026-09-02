import type { TemperSet } from "../../temper-set.page-type.ts"

export const blooddrinker = {
  id: "01a05fda-02f3-7f4a-83e5-36089590b8dd",
  pageTypeSlug: "temper-set",
  slug: "blooddrinker",
  title: "Blooddrinker",
  key: "blooddrinker",
  esoSetId: 339,
  subcategoryId: "dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
