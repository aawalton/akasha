import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const feet = {
  id: "01a05fd5-4dce-7ec8-a159-0d074dc6eec1",
  type: "page-type/temper-armor-type",
  slug: "feet",
  title: "Feet",
  key: "feet",
  armorMultiplier: 7,
  validSlots: ["temper-armor-slot/feet"],
  enchantmentMultiplier: 0.405,
  createdAt: "2026-09-02T01:56:49.742Z",
  updatedAt: "2026-10-19T23:26:02.763Z",
} as const satisfies TemperArmorType
