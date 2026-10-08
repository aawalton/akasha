import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const weaponTypePower = {
  id: "01a05fd1-d43f-7b6d-b173-8c9bd644d9a3",
  type: "page-type/number-property",
  slug: "weapon-type-power",
  propertySlug: "weapon-power",
  definition: "the damage a weapon of this kind does at the top quality and level",
  max: null,
  types: "ts",
  createdAt: "2026-09-02T01:53:02.015Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies NumberProperty
