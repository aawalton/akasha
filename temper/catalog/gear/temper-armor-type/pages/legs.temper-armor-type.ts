import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const legs = {
  id: "01a05fd5-4dcf-7077-8afd-71a92f2d45a3",
  type: "page-type/temper-armor-type",
  slug: "legs",
  title: "Legs",
  key: "legs",
  armorMultiplier: 7,
  validSlots: ["temper-armor-slot/legs"],
  enchantmentMultiplier: 1,
  createdAt: "2026-09-02T01:56:49.743Z",
  updatedAt: "2026-09-27T05:21:39.000Z",
} as const satisfies TemperArmorType
