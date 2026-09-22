import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hagravensGarden = {
  id: "019e66e6-a089-780c-ba3a-c081a0c41103",
  type: "page-type/temper-set",
  slug: "hagravens-garden",
  title: "Hagraven's Garden",
  key: "hagravens-garden",
  esoSetId: 340,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
