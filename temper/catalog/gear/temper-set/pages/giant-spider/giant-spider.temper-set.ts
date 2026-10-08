import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const giantSpider = {
  id: "019e6484-604a-7aee-84d6-770c3afbe211",
  type: "page-type/temper-set",
  slug: "giant-spider",
  title: "Giant Spider",
  key: "giant-spider",
  esoSetId: 264,
  hashPlace: 196,
  esoItemIds: [94452, 94456, 94724, 94728, 94996, 95000],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD"],
  category: "temper-set-category/other",
  valid: ["head:*"],
  bonuses: "jsonl",
  icons: "jsonl",
  createdAt: "2026-05-26T13:40:57.546Z",
  updatedAt: "2026-09-25T16:16:22.000Z",
} as const satisfies TemperSet
