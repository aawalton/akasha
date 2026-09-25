import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ringOfTheWildHunt = {
  id: "019e6484-6035-772c-977d-ed961a48b434",
  type: "page-type/temper-set",
  slug: "ring-of-the-wild-hunt",
  title: "Ring of the Wild Hunt",
  key: "ring-of-the-wild-hunt",
  esoSetId: 503,
  esoItemIds: [163052],
  esoEquipTypes: ["EQUIP_TYPE_RING"],
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
