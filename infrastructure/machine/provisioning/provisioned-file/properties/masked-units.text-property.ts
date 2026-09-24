import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const maskedUnits = {
  id: "01a0d5a1-8ed0-7173-8152-5fc237fc9cba",
  type: "page-type/text-property",
  slug: "masked-units",
  propertySlug: "masked-units",
  definition: "a systemd unit masked on the machine the page is for",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
