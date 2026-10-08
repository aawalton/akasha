import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const chest = {
  id: "01a05fd5-4dcd-7a31-8d6f-0a1aa3b9b0df",
  type: "page-type/temper-armor-type",
  slug: "chest",
  title: "Chest",
  key: "chest",
  armorMultiplier: 8,
  validSlots: ["temper-armor-slot/chest"],
  enchantmentMultiplier: 1,
  createdAt: "2026-09-02T01:56:49.741Z",
  updatedAt: "2026-09-27T05:21:39.000Z",
} as const satisfies TemperArmorType
