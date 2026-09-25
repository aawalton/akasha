import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const glorgolochTheDestroyer = {
  id: "019e6484-5ff8-70eb-9d0a-31724d8a7fd0",
  type: "page-type/temper-set",
  slug: "glorgoloch-the-destroyer",
  title: "Glorgoloch the Destroyer",
  key: "glorgoloch-the-destroyer",
  esoSetId: 600,
  esoItemIds: [175308, 175314, 175320, 175326, 175332, 175338],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
