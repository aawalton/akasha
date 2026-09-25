import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const malacathsBandOfBrutality = {
  id: "019e6484-602f-7d64-9c2b-b0bf96c3f038",
  type: "page-type/temper-set",
  slug: "malacaths-band-of-brutality",
  title: "Malacath's Band of Brutality",
  key: "malacaths-band-of-brutality",
  esoSetId: 520,
  esoItemIds: [165880],
  esoEquipTypes: ["EQUIP_TYPE_RING"],
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
