import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const immolatorCharr = {
  id: "019e6484-5ffc-7f81-a83e-d0c3f81ac2bd",
  type: "page-type/temper-set",
  slug: "immolator-charr",
  title: "Immolator Charr",
  key: "immolator-charr",
  esoSetId: 599,
  esoItemIds: [175252, 175258, 175264, 175270, 175276, 175282],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
