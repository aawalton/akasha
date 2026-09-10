import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Purpose = string

export const purpose = {
  id: "01a05333-723a-7ec2-85ad-b5aa0b77a8af",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "purpose",
  propertySlug: "purpose",
  definition: "what a persona is for",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
