import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const faunsLarkCladding = {
  id: "019e6484-602c-720b-877a-fbc6a1a31270",
  type: "page-type/temper-set",
  slug: "fauns-lark-cladding",
  title: "Faun's Lark Cladding",
  key: "fauns-lark-cladding",
  esoSetId: 674,
  esoItemIds: [190886],
  esoArmorTypes: ["ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_CHEST"],
  category: "temper-set-category/mythic",
  valid: ["chest:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
