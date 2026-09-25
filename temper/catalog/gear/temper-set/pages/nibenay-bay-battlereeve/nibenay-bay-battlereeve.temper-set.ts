import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nibenayBayBattlereeve = {
  id: "019e66ec-7835-7f2c-9d40-9a59816a0607",
  type: "page-type/temper-set",
  slug: "nibenay-bay-battlereeve",
  title: "Nibenay Bay Battlereeve",
  key: "nibenay-bay-battlereeve",
  esoSetId: 713,
  esoItemIds: [198818, 198824, 198830, 198836, 198842, 198848],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/pvp",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
