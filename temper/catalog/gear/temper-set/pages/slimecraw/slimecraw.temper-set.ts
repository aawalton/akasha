import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const slimecraw = {
  id: "019e6484-6017-776b-90d1-aba01af078e1",
  type: "page-type/temper-set",
  slug: "slimecraw",
  title: "Slimecraw",
  key: "slimecraw",
  esoSetId: 270,
  esoItemIds: [94500, 94636, 94772, 94908, 95044, 95180],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
