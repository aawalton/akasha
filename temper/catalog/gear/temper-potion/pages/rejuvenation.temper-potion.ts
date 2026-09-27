import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const rejuvenation = {
  id: "01a0e108-307d-7830-823a-13f3c05f64f5",
  type: "page-type/temper-potion",
  slug: "rejuvenation",
  title: "Rejuvenation",
  key: "rejuvenation",
  itemId: 54859,
  restores: [
    "temper-metric/health-restore",
    "temper-metric/magicka-restore",
    "temper-metric/stamina-restore",
  ],
} as const satisfies TemperPotion
