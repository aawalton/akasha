import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hideOfMorihaus = {
  id: "019e66e7-6a67-79e6-99a8-32a55eacbe40",
  type: "page-type/temper-set",
  slug: "hide-of-morihaus",
  title: "Hide of Morihaus",
  key: "hide-of-morihaus",
  esoSetId: 243,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
