import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pelinalsWrath = {
  id: "019e668e-9a5d-73a2-b718-53571d92ebe6",
  type: "page-type/temper-set",
  slug: "pelinals-wrath",
  title: "Pelinal's Wrath",
  key: "pelinals-wrath",
  esoSetId: 242,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
