import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const feet = {
  id: "01a05fd5-4dce-7ec8-a159-0d074dc6eec1",
  type: "page-type/temper-armor-type",
  slug: "feet",
  title: "Feet",
  key: "feet",
  armorMultiplier: 7,
  validSlots: ["temper-armor-slot/feet"],
  enchantmentMultiplier: 0.4045,
  createdAt: "2026-09-02T01:56:49.742Z",
  updatedAt: "2026-09-27T05:21:39.000Z",
} as const satisfies TemperArmorType
