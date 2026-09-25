import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const symphonyOfBlades = {
  id: "019e6484-601d-71b7-949b-7e0780f2fae9",
  type: "page-type/temper-set",
  slug: "symphony-of-blades",
  title: "Symphony of Blades",
  key: "symphony-of-blades",
  esoSetId: 436,
  esoItemIds: [147235, 147236, 147237, 147238, 147239, 147240],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
