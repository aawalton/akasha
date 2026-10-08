import type { TemperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.types.ts"

export const necklace = {
  id: "019e46b4-42ab-7172-b0cb-06555bd2abb6",
  type: "page-type/temper-jewelry-type",
  slug: "necklace",
  title: "Necklace",
  key: "necklace",
  validSlots: ["temper-jewelry-slot/necklace"],

  slotEquipType: "temper-equip-type/neck",
  createdAt: "2026-05-20T18:44:39.211Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies TemperJewelryType
