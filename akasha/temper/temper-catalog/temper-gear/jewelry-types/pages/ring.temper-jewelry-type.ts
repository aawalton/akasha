import type { TemperJewelryType } from "../temper-jewelry-type.page-type.ts"

export const ring = {
  id: "01a05fd5-4dd2-7750-81cb-17371426fff7",
  pageTypeSlug: "temper-jewelry-type",
  slug: "ring",
  title: "Ring",
  key: "ring",
  validSlots: ["ring-1", "ring-2"],
} as const satisfies TemperJewelryType
