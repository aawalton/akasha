import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const triRestorationPotionOfVengeance = {
  id: "01a0e108-307d-7ef6-8534-b5993fc9eaf3",
  type: "page-type/temper-potion",
  slug: "tri-restoration-potion-of-vengeance",
  title: "Tri-Restoration Potion of Vengeance",
  key: "tri-restoration-potion-of-vengeance",
  itemId: 214314,
  restores: [
    "temper-metric/health-restore",
    "temper-metric/magicka-restore",
    "temper-metric/stamina-restore",
  ],
} as const satisfies TemperPotion
