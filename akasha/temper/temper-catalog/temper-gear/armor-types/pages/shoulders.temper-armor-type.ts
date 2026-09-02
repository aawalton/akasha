import type { TemperArmorType } from "../temper-armor-type.page-type.ts"

export const shoulders = {
  id: "01a05fd5-4dd0-79c5-bc63-bdac48dfd600",
  pageTypeSlug: "temper-armor-type",
  slug: "shoulders",
  title: "Shoulders",
  key: "shoulders",
  armorMultiplier: 7,
  isLargeEnchantSlot: false,
  validSlots: ["shoulders"],
} as const satisfies TemperArmorType
