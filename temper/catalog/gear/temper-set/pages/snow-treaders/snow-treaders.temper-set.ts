import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const snowTreaders = {
  id: "019e6484-6039-7275-85f1-2bca337b1477",
  type: "page-type/temper-set",
  slug: "snow-treaders",
  title: "Snow Treaders",
  key: "snow-treaders",
  esoSetId: 519,
  esoItemIds: [165879],
  esoArmorTypes: ["ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_FEET"],
  category: "temper-set-category/mythic",
  valid: ["feet:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
