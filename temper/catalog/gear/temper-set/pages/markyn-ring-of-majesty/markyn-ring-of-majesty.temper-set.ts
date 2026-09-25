import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const markynRingOfMajesty = {
  id: "019e6484-6030-7be9-a8fb-89597d47ce9a",
  type: "page-type/temper-set",
  slug: "markyn-ring-of-majesty",
  title: "Markyn Ring of Majesty",
  key: "markyn-ring-of-majesty",
  esoSetId: 625,
  esoItemIds: [182208],
  esoEquipTypes: ["EQUIP_TYPE_RING"],
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
