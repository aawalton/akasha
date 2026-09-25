import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vykosa = {
  id: "019e6484-6023-7be5-bdc9-8b82c7dfb234",
  type: "page-type/temper-set",
  slug: "vykosa",
  title: "Vykosa",
  key: "vykosa",
  esoSetId: 398,
  esoItemIds: [141670, 141671, 141672, 141673, 141674, 141675],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
