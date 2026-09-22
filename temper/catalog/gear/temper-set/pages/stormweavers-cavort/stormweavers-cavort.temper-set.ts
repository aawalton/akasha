import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stormweaversCavort = {
  id: "019e6484-603b-72d9-9f93-df2e269c50eb",
  type: "page-type/temper-set",
  slug: "stormweavers-cavort",
  title: "Stormweaver's Cavort",
  key: "stormweavers-cavort",
  esoSetId: 675,
  category: "temper-set-category/mythic",
  valid: ["legs:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
