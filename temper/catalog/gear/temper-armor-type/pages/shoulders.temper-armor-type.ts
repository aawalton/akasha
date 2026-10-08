import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const shoulders = {
  id: "01a05fd5-4dd0-79c5-bc63-bdac48dfd600",
  type: "page-type/temper-armor-type",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  armorMultiplier: 7,
  validSlots: ["temper-armor-slot/shoulders"],
  enchantmentMultiplier: 0.4045,
  createdAt: "2026-09-02T01:56:49.744Z",
  updatedAt: "2026-09-27T05:21:39.000Z",
} as const satisfies TemperArmorType
