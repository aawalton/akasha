import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const magmaIncarnate = {
  id: "019e6484-6005-7c9d-b484-31d4bdef80ae",
  type: "page-type/temper-set",
  slug: "magma-incarnate",
  title: "Magma Incarnate",
  key: "magma-incarnate",
  esoSetId: 609,
  esoItemIds: [178627, 178633, 178639, 178645, 178651, 178657],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
