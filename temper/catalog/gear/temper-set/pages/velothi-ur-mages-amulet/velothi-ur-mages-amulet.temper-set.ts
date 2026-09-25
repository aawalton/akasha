import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const velothiUrMagesAmulet = {
  id: "019e6484-6044-7b18-ab3b-6139519f6ab3",
  type: "page-type/temper-set",
  slug: "velothi-ur-mages-amulet",
  title: "Velothi Ur-Mage's Amulet",
  key: "velothi-ur-mages-amulet",
  esoSetId: 694,
  esoItemIds: [194512],
  esoEquipTypes: ["EQUIP_TYPE_NECK"],
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
