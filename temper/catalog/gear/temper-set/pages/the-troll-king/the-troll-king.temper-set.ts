import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theTrollKing = {
  id: "019e6484-601e-7f70-8d03-6938221af37d",
  type: "page-type/temper-set",
  slug: "the-troll-king",
  title: "The Troll King",
  key: "the-troll-king",
  esoSetId: 278,
  esoItemIds: [94564, 94700, 94836, 94972, 95108, 95244],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
