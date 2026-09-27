import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const crownHealthPotion64510 = {
  id: "01a0e108-307d-7469-8a76-3451408a5502",
  type: "page-type/temper-potion",
  slug: "crown-health-potion-64510",
  title: "Crown Health Potion",
  key: "crown-health-potion-64510",
  itemId: 64510,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
