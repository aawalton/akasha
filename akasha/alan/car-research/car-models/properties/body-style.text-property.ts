import type { TextProperty } from "@akasha/pages-system/text-property"

export type BodyStyle = string

export const bodyStyle = {
  id: "01a0659a-4bc5-7022-a7fc-eb2d3bb23b11",
  pageTypeSlug: "text-property",
  slug: "body-style",
  propertySlug: "body-style",
  definition: "the shape of the body",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
