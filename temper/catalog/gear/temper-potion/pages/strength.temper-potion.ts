import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const strength = {
  id: "01a0e108-307d-7a29-99fe-91d8d791c5e0",
  type: "page-type/temper-potion",
  slug: "strength",
  title: "Strength",
  key: "strength",
  itemId: 54857,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
