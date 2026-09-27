import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const whiteTincture = {
  id: "01a0e108-307d-7f28-87dc-43acc00f176b",
  type: "page-type/temper-potion",
  slug: "white-tincture",
  title: "White Tincture",
  key: "white-tincture",
  itemId: 64741,
  restores: [
    "temper-metric/health-restore",
    "temper-metric/magicka-restore",
    "temper-metric/stamina-restore",
  ],
} as const satisfies TemperPotion
