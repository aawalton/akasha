import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const selene = {
  id: "019e6484-6013-7b64-9cdc-76a602968d5f",
  type: "page-type/temper-set",
  slug: "selene",
  title: "Selene",
  key: "selene",
  esoSetId: 279,
  esoItemIds: [94572, 94708, 94844, 94980, 95116, 95252],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
