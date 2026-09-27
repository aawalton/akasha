import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const bleed = {
  id: "01a0e2d2-8c71-7800-8450-df0ec4adf03c",
  type: "page-type/temper-damage-type",
  slug: "bleed",
  title: "Bleed",
  key: "bleed",
  displayOrder: 12,
} as const satisfies TemperDamageType
