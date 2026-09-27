import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const boundTriRestorationPotion = {
  id: "01a0e108-307d-77bd-bf3d-574d198f57de",
  type: "page-type/temper-potion",
  slug: "bound-tri-restoration-potion",
  title: "Bound Tri-Restoration Potion",
  key: "bound-tri-restoration-potion",
  itemId: 217946,
  restores: [
    "temper-metric/health-restore",
    "temper-metric/magicka-restore",
    "temper-metric/stamina-restore",
  ],
} as const satisfies TemperPotion
