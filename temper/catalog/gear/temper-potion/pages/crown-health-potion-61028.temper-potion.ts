import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const crownHealthPotion61028 = {
  id: "01a0e108-307d-7cb9-b92d-2f1fbf3b1fc5",
  type: "page-type/temper-potion",
  slug: "crown-health-potion-61028",
  title: "Crown Health Potion",
  key: "crown-health-potion-61028",
  itemId: 61028,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
