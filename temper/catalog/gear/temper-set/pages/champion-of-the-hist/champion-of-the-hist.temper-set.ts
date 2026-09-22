import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const championOfTheHist = {
  id: "019e66e7-6a51-712a-b471-30dc376d2d58",
  type: "page-type/temper-set",
  slug: "champion-of-the-hist",
  title: "Champion of the Hist",
  key: "champion-of-the-hist",
  esoSetId: 407,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
