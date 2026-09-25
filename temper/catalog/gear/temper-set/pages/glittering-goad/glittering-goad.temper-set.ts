import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const glitteringGoad = {
  id: "01a0d94b-93dd-7a80-a394-b7458b2f587a",
  type: "page-type/temper-set",
  slug: "glittering-goad",
  title: "Glittering Goad",
  key: "glittering-goad",
  esoSetId: 849,
  esoItemIds: [224112, 224118, 224124, 224130, 224136, 224142],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
