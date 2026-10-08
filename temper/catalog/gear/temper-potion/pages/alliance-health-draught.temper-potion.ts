import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const allianceHealthDraught = {
  id: "01a0e108-307d-70ab-9b87-cf0f594e931b",
  type: "page-type/temper-potion",
  slug: "alliance-health-draught",
  title: "Alliance Health Draught",
  key: "alliance-health-draught",
  itemId: 71071,
  restores: ["temper-metric/health-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
