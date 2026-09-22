import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const zensRedress = {
  id: "019e66e6-a0e9-764e-976e-fa8493df0ea8",
  type: "page-type/temper-set",
  slug: "zens-redress",
  title: "Z'en's Redress",
  key: "zens-redress",
  esoSetId: 455,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
