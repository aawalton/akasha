import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Purpose = string

export const purpose = {
  id: "01a05333-723a-7ec2-85ad-b5aa0b77a8af",
  pageTypeSlug: "text-property",
  slug: "purpose",
  propertySlug: "purpose",
  definition: "what a persona is for",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
