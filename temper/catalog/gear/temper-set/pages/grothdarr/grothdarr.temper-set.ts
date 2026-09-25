import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grothdarr = {
  id: "019e6484-5ff9-70e7-831e-db83ac174eb8",
  type: "page-type/temper-set",
  slug: "grothdarr",
  title: "Grothdarr",
  key: "grothdarr",
  esoSetId: 280,
  esoItemIds: [94580, 94716, 94852, 94988, 95124, 95260],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
