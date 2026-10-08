import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const roguishStealthDraught = {
  id: "01a0e108-307d-7466-82c2-86866973606c",
  type: "page-type/temper-potion",
  slug: "roguish-stealth-draught",
  title: "Roguish Stealth Draught",
  key: "roguish-stealth-draught",
  itemId: 74728,
  restores: ["temper-metric/stamina-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
