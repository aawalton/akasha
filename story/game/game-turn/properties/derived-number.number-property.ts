import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const derivedNumber = {
  id: "01a0c69f-7737-74cb-b6a8-12093066dfd1",
  type: "page-type/number-property",
  slug: "derived-number",
  propertySlug: "number",
  definition: "what a mechanic worked out for a turn",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
