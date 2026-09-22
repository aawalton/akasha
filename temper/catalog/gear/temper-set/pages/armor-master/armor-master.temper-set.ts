import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorMaster = {
  id: "019e668e-9a34-7a10-a721-c69164961584",
  type: "page-type/temper-set",
  slug: "armor-master",
  title: "Armor Master",
  key: "armor-master",
  esoSetId: 178,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
