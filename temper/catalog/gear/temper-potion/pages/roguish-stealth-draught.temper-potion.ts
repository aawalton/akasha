import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const roguishStealthDraught = {
  id: "01a0e108-307d-7466-82c2-86866973606c",
  type: "page-type/temper-potion",
  slug: "roguish-stealth-draught",
  title: "Roguish Stealth Draught",
  key: "roguish-stealth-draught",
  itemId: 74728,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
