import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const attunementCounter = {
  id: "01a0ca71-053d-75c2-aaa2-8b64481eaff4",
  type: "page-type/number-property",
  slug: "attunement-counter",
  propertySlug: "counter",
  definition: "how far an attunement has come toward its next rank",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
