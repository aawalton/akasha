import type { TemperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.types.ts"

export const ring = {
  id: "019e46b4-42ad-7d1a-b334-98e313db5afb",
  type: "page-type/temper-jewelry-type",
  slug: "ring",
  title: "Ring",
  key: "ring",
  validSlots: ["temper-jewelry-slot/ring-1", "temper-jewelry-slot/ring-2"],
} as const satisfies TemperJewelryType
