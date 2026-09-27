import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const requiredRapportLevel = {
  id: "01a0e091-e9da-7912-a4f7-f7064841bba1",
  type: "page-type/number-property",
  slug: "required-rapport-level",
  propertySlug: "required-rapport-level",
  definition: "the rapport level a companion must reach before a quest is offered",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
