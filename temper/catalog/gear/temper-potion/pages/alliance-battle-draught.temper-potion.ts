import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const allianceBattleDraught = {
  id: "01a0e108-307d-7565-96df-4faf08d9a80f",
  type: "page-type/temper-potion",
  slug: "alliance-battle-draught",
  title: "Alliance Battle Draught",
  key: "alliance-battle-draught",
  itemId: 71073,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
