import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rushOfAgony = {
  id: "019e66e6-a0b9-78db-b4f9-b85088c59410",
  type: "page-type/temper-set",
  slug: "rush-of-agony",
  title: "Rush of Agony",
  key: "rush-of-agony",
  esoSetId: 604,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
