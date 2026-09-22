import type { TemperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.types.ts"

export const shield = {
  id: "01a05fd5-4dcf-7229-b15e-ba21f4283324",
  type: "page-type/temper-armor-type",
  slug: "shield",
  title: "Shield",
  key: "shield",
  armorMultiplier: 1,
  isLargeEnchantSlot: true,
  validSlots: ["temper-weapon-slot/off-hand"],
} as const satisfies TemperArmorType
