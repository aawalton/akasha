import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const shoulders = {
  id: "01a05fd5-4dd0-79c5-bc63-bdac48dfd600",
  type: "page-type/temper-armor-type",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  armorMultiplier: 7,
  isLargeEnchantSlot: false,
  validSlots: ["temper-armor-slot/shoulders"],
} as const satisfies TemperArmorType
