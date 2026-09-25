import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const engineGuardian = {
  id: "019e6484-5ff5-7d63-a4b4-a7468c5ee893",
  type: "page-type/temper-set",
  slug: "engine-guardian",
  title: "Engine Guardian",
  key: "engine-guardian",
  esoSetId: 166,
  esoItemIds: [59524, 59530, 59536, 59542, 59548, 59554],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
