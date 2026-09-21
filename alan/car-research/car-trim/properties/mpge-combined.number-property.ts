import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const mpgeCombined = {
  id: "01a0c546-7900-7a4b-aa19-93a33d8c54fc",
  type: "page-type/number-property",
  slug: "mpge-combined",
  propertySlug: "mpge-combined",
  definition: "how far the car goes on a gallon's worth of energy over the EPA's mixed cycle",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
