import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const noPotion = {
  id: "01a0e0a1-8e4a-74b0-bb86-a9e67aa5c871",
  type: "page-type/temper-potion",
  slug: "no-potion",
  title: "No Potion",
  key: "no-potion",
  hashPlace: 0,
} as const satisfies TemperPotion
