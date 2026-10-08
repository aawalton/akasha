import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const head = {
  id: "01a05fd5-4dcf-7b10-8d5b-cb0c96173698",
  type: "page-type/temper-armor-type",
  slug: "head",
  title: "Head",
  key: "head",
  armorMultiplier: 7,
  validSlots: ["temper-armor-slot/head"],
  enchantmentMultiplier: 1,
  createdAt: "2026-09-02T01:56:49.743Z",
  updatedAt: "2026-09-27T05:21:39.000Z",
} as const satisfies TemperArmorType
