import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thousandEyes = {
  id: "01a0d94b-2de9-7dce-ad59-5aaa20723e45",
  type: "page-type/temper-set",
  slug: "thousand-eyes",
  title: "Thousand Eyes",
  key: "thousand-eyes",
  esoSetId: 850,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
