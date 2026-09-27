import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const disease = {
  id: "01a0e2d2-8c72-749f-b635-8e2060d50451",
  type: "page-type/temper-damage-type",
  slug: "disease",
  title: "Disease",
  key: "disease",
  displayOrder: 10,
} as const satisfies TemperDamageType
