import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const morasWhispers = {
  id: "019e6484-6031-7a65-80fd-18f965f0ea8a",
  type: "page-type/temper-set",
  slug: "moras-whispers",
  title: "Mora's Whispers",
  key: "moras-whispers",
  esoSetId: 654,
  esoItemIds: [187654],
  esoArmorTypes: ["ARMORTYPE_LIGHT"],
  esoEquipTypes: ["EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/mythic",
  valid: ["shoulders:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
