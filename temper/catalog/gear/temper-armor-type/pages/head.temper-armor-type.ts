import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const head = {
  id: "01a05fd5-4dcf-7b10-8d5b-cb0c96173698",
  type: "page-type/temper-armor-type",
  slug: "head",
  title: "Head",
  key: "head",
  armorMultiplier: 7,
  isLargeEnchantSlot: true,
  validSlots: ["temper-armor-slot/head"],
} as const satisfies TemperArmorType
