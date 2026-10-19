import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const hands = {
  id: "01a05fd5-4dce-7497-8a60-3d2aec3761d1",
  type: "page-type/temper-armor-type",
  slug: "hands",
  title: "Hands",
  key: "hands",
  armorMultiplier: 4,
  validSlots: ["temper-armor-slot/hands"],
  enchantmentMultiplier: 0.405,
  createdAt: "2026-09-02T01:56:49.742Z",
  updatedAt: "2026-10-19T23:26:02.763Z",
} as const satisfies TemperArmorType
