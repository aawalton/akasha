import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mightyChudan = {
  id: "019e6484-6007-7c51-916f-a58010dfa650",
  type: "page-type/temper-set",
  slug: "mighty-chudan",
  title: "Mighty Chudan",
  key: "mighty-chudan",
  esoSetId: 256,
  esoItemIds: [82176, 82177, 82178, 82179, 82180, 82181],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
