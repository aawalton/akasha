import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const placeExitWay = {
  id: "01a0d42f-13c3-7a76-be15-ff833c484d63",
  type: "page-type/text-property",
  slug: "place-exit-way",
  propertySlug: "way",
  definition: "how an exit is taken",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
