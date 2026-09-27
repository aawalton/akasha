import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const roguishEscapeDraught = {
  id: "01a0e108-307d-731f-80f4-7a3549efe88e",
  type: "page-type/temper-potion",
  slug: "roguish-escape-draught",
  title: "Roguish Escape Draught",
  key: "roguish-escape-draught",
  itemId: 74729,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
