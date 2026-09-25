import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grundwulf = {
  id: "019e6484-5ffa-7037-9692-7990e6f76f0d",
  type: "page-type/temper-set",
  slug: "grundwulf",
  title: "Grundwulf",
  key: "grundwulf",
  esoSetId: 458,
  esoItemIds: [152260, 152261, 152262, 152263, 152264, 152265],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
