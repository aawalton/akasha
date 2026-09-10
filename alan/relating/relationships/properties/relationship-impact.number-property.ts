import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RelationshipImpact = number

export const relationshipImpact = {
  id: "01a06594-c6e2-7557-b218-89200a8d11fe",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "relationship-impact",
  propertySlug: "relationship-impact",
  definition: "how much this person changes how Alan's life goes",
  max: null,
} as const satisfies NumberProperty
