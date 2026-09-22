import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const twiceBornStar = {
  id: "019e668e-9a6f-70e0-b6e1-b9a6ea195ed7",
  type: "page-type/temper-set",
  slug: "twice-born-star",
  title: "Twice-Born Star",
  key: "twice-born-star",
  esoSetId: 161,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
