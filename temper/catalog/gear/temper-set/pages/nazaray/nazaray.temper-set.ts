import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nazaray = {
  id: "019e6484-600a-7e09-95b2-cca3c0806806",
  type: "page-type/temper-set",
  slug: "nazaray",
  title: "Nazaray",
  key: "nazaray",
  esoSetId: 633,
  esoItemIds: [183795, 183801, 183807, 183813, 183819, 183825],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
