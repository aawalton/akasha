import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const squallOfRetribution = {
  id: "019e66e7-6a20-7465-8cba-8ffaf70b87f0",
  type: "page-type/temper-set",
  slug: "squall-of-retribution",
  title: "Squall of Retribution",
  key: "squall-of-retribution",
  esoSetId: 797,
  esoItemIds: [213121, 213127, 213133, 213139, 213145, 213151],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/no-type",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
