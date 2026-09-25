import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const huntsmansWarmask = {
  id: "019e66e7-6a0a-7768-a22e-ade56e964aa5",
  type: "page-type/temper-set",
  slug: "huntsmans-warmask",
  title: "Huntsman's Warmask",
  key: "huntsmans-warmask",
  esoSetId: 845,
  esoItemIds: [223189],
  esoArmorTypes: ["ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD"],
  category: "temper-set-category/no-type",
  valid: ["head:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
