import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nunatak = {
  id: "019e6484-600e-71a5-b264-37fe9c87833a",
  type: "page-type/temper-set",
  slug: "nunatak",
  title: "Nunatak",
  key: "nunatak",
  esoSetId: 634,
  esoItemIds: [183903, 183909, 183915, 183921, 183927, 183933],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
