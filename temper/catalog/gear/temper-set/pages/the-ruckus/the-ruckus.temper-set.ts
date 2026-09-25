import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theRuckus = {
  id: "01a0d94b-cba8-7b6a-8bf4-68393c991fca",
  type: "page-type/temper-set",
  slug: "the-ruckus",
  title: "The Ruckus",
  key: "the-ruckus",
  esoSetId: 851,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
