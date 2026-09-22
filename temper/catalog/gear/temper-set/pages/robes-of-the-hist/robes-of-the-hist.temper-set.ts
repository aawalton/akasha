import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfTheHist = {
  id: "019e66e7-6a7f-7c8a-ba76-366b9ef20ba4",
  type: "page-type/temper-set",
  slug: "robes-of-the-hist",
  title: "Robes of the Hist",
  key: "robes-of-the-hist",
  esoSetId: 66,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
