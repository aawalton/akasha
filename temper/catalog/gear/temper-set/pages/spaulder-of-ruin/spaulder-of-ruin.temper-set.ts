import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spaulderOfRuin = {
  id: "019e6484-603a-72f3-811b-8e500643bc62",
  type: "page-type/temper-set",
  slug: "spaulder-of-ruin",
  title: "Spaulder of Ruin",
  key: "spaulder-of-ruin",
  esoSetId: 627,
  esoItemIds: [181695],
  esoArmorTypes: ["ARMORTYPE_LIGHT"],
  esoEquipTypes: ["EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/mythic",
  valid: ["shoulders:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
