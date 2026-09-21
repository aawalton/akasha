import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const payloadCapacityLb = {
  id: "01a0c547-25a0-7aba-b9c2-c55a9b6572eb",
  type: "page-type/number-property",
  slug: "payload-capacity-lb",
  propertySlug: "payload-capacity-lb",
  definition: "how much the car may carry in people and cargo together, in pounds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
