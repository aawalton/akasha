import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const frost = {
  id: "01a0e2d2-8c72-7777-959f-4f486d135e5e",
  type: "page-type/temper-damage-type",
  slug: "frost",
  title: "Frost",
  key: "frost",
  displayOrder: 6,
} as const satisfies TemperDamageType
