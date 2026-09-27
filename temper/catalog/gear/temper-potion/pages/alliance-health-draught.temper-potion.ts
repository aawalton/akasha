import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const allianceHealthDraught = {
  id: "01a0e108-307d-70ab-9b87-cf0f594e931b",
  type: "page-type/temper-potion",
  slug: "alliance-health-draught",
  title: "Alliance Health Draught",
  key: "alliance-health-draught",
  itemId: 71071,
  restores: ["temper-metric/health-restore"],
} as const satisfies TemperPotion
