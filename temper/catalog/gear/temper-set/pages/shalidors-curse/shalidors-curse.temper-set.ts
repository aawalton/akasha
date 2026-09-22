import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shalidorsCurse = {
  id: "019e668e-9a63-73da-bbf2-7a242178937a",
  type: "page-type/temper-set",
  slug: "shalidors-curse",
  title: "Shalidor's Curse",
  key: "shalidors-curse",
  esoSetId: 95,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
