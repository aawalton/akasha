import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const scourgeHarvester = {
  id: "019e6484-6012-7cbf-a3d0-7329da41c373",
  type: "page-type/temper-set",
  slug: "scourge-harvester",
  title: "Scourge Harvester",
  key: "scourge-harvester",
  esoSetId: 165,
  esoItemIds: [59488, 59494, 59500, 59506, 59512, 59518],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
