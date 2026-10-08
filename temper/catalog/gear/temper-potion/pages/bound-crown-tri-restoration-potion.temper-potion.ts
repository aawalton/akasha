import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const boundCrownTriRestorationPotion = {
  id: "01a0e108-307d-700c-9595-6681a20f92c5",
  type: "page-type/temper-potion",
  slug: "bound-crown-tri-restoration-potion",
  title: "Bound Crown Tri-Restoration Potion",
  key: "bound-crown-tri-restoration-potion",
  itemId: 135114,
  restores: [
    "temper-metric/health-restore",
    "temper-metric/magicka-restore",
    "temper-metric/stamina-restore",
  ],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
