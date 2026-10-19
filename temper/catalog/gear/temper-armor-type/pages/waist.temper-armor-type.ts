import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const waist = {
  id: "01a05fd5-4dd0-7b4e-a6cf-104b294b6966",
  type: "page-type/temper-armor-type",
  slug: "waist",
  title: "Waist",
  key: "waist",
  armorMultiplier: 3,
  validSlots: ["temper-armor-slot/waist"],
  enchantmentMultiplier: 0.405,
  createdAt: "2026-09-02T01:56:49.744Z",
  updatedAt: "2026-10-19T23:26:02.763Z",
} as const satisfies TemperArmorType
