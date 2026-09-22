import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pointBlankSnipe = {
  id: "019e6484-5fcf-7246-9958-304dca92ca90",
  type: "page-type/temper-set",
  slug: "point-blank-snipe",
  title: "Point-Blank Snipe",
  key: "point-blank-snipe",
  esoSetId: 560,
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
