import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const poison = {
  id: "01a0e2d2-8c72-7b7e-b234-f75b1407e849",
  type: "page-type/temper-damage-type",
  slug: "poison",
  title: "Poison",
  key: "poison",
  displayOrder: 11,
  createdAt: "2026-09-27T12:24:04.466Z",
  updatedAt: "2026-09-27T12:24:07.000Z",
} as const satisfies TemperDamageType
