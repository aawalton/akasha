import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const minutesRaising = {
  id: "01a0b75a-36b8-7448-8071-34397ff1ff75",
  type: "page-type/number-property",
  slug: "minutes-raising",
  propertySlug: "minutes-raising",
  definition: "how many minutes of easy work raise Alan's temperature before a bout",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
