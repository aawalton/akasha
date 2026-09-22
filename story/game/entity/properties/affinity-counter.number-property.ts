import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const affinityCounter = {
  id: "01a0c638-c954-778c-ad9f-3304de506db9",
  type: "page-type/number-property",
  slug: "affinity-counter",
  propertySlug: "counter",
  definition: "how far an affinity has come within its own tier",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
