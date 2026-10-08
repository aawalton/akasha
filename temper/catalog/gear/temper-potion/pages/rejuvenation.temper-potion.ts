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
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
