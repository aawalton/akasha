import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const torchbugTreacle = {
  id: "01a0e108-307d-778a-8ef8-642772959676",
  type: "page-type/temper-potion",
  slug: "torchbug-treacle",
  title: "Torchbug Treacle",
  key: "torchbug-treacle",
  itemId: 42406,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
