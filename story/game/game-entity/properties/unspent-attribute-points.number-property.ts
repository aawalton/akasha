import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const unspentAttributePoints = {
  id: "01a0c63e-b12c-7d0b-b5f7-331a73529306",
  type: "page-type/number-property",
  slug: "unspent-attribute-points",
  propertySlug: "unspent-attribute-points",
  definition: "how many points an entity has left to put into its attributes",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
