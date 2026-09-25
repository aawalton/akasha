import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deathDealersFete = {
  id: "019e6484-6029-75dd-9ce1-407f6fa79447",
  type: "page-type/temper-set",
  slug: "death-dealers-fete",
  title: "Death Dealer's Fete",
  key: "death-dealers-fete",
  esoSetId: 596,
  esoItemIds: [175527],
  esoEquipTypes: ["EQUIP_TYPE_RING"],
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
