import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const diamondsVictory = {
  id: "019e668e-9a41-713c-aa67-f7b23b0e31d9",
  type: "page-type/temper-set",
  slug: "diamonds-victory",
  title: "Diamond's Victory",
  key: "diamonds-victory",
  esoSetId: 584,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
