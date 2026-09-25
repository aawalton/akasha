import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const oakensoulRing = {
  id: "019e6484-6032-7931-99f1-cb62879e7663",
  type: "page-type/temper-set",
  slug: "oakensoul-ring",
  title: "Oakensoul Ring",
  key: "oakensoul-ring",
  esoSetId: 658,
  esoItemIds: [187658],
  esoEquipTypes: ["EQUIP_TYPE_RING"],
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
