import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const torcOfTonalConstancy = {
  id: "019e6484-6043-7243-9e9b-5c40fa86ada0",
  type: "page-type/temper-set",
  slug: "torc-of-tonal-constancy",
  title: "Torc of Tonal Constancy",
  key: "torc-of-tonal-constancy",
  esoSetId: 505,
  esoItemIds: [163451],
  esoEquipTypes: ["EQUIP_TYPE_NECK"],
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
