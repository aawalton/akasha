import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pirateSkeleton = {
  id: "019e6484-600f-7fd6-b7b5-358ee71a5570",
  type: "page-type/temper-set",
  slug: "pirate-skeleton",
  title: "Pirate Skeleton",
  key: "pirate-skeleton",
  esoSetId: 277,
  esoItemIds: [94556, 94692, 94828, 94964, 95100, 95236],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
