import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const allianceBattleDraught = {
  id: "01a0e108-307d-7565-96df-4faf08d9a80f",
  type: "page-type/temper-potion",
  slug: "alliance-battle-draught",
  title: "Alliance Battle Draught",
  key: "alliance-battle-draught",
  itemId: 71073,
  restores: ["temper-metric/stamina-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
