import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const physical = {
  id: "01a0e2d2-8c72-719c-9e19-c9e7a5a6685c",
  type: "page-type/temper-damage-type",
  slug: "physical",
  title: "Physical",
  key: "physical",
  displayOrder: 2,
} as const satisfies TemperDamageType
