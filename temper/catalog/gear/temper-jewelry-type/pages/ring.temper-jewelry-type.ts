import type { TemperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.types.ts"

export const ring = {
  id: "019e46b4-42ad-7d1a-b334-98e313db5afb",
  type: "page-type/temper-jewelry-type",
  slug: "ring",
  title: "Ring",
  key: "ring",
  validSlots: ["temper-jewelry-slot/ring-1", "temper-jewelry-slot/ring-2"],

  slotEquipType: "temper-equip-type/ring",
  createdAt: "2026-05-20T18:44:39.213Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies TemperJewelryType
