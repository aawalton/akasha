import type { TextProperty } from "@akasha/pages/text-property"

export type BodyStyle = string

export const bodyStyle = {
  id: "01a0659a-4bc5-7022-a7fc-eb2d3bb23b11",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "body-style",
  propertySlug: "body-style",
  definition: "the shape of the body",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
