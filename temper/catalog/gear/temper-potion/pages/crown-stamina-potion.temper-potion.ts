import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const crownStaminaPotion = {
  id: "01a0e108-307d-7d5f-a6e6-61adc125fd8c",
  type: "page-type/temper-potion",
  slug: "crown-stamina-potion",
  title: "Crown Stamina Potion",
  key: "crown-stamina-potion",
  itemId: 61029,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
