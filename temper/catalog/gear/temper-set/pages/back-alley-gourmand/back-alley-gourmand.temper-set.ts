import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const backAlleyGourmand = {
  id: "019e66e7-6a43-78a3-93c7-07d3fdfc6d3b",
  type: "page-type/temper-set",
  slug: "back-alley-gourmand",
  title: "Back-Alley Gourmand",
  key: "back-alley-gourmand",
  esoSetId: 671,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
