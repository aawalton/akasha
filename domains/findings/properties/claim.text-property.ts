import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Claim = string

export const claim = {
  id: "01a04bc5-f8c4-7868-90c9-0a82060dd839",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "claim",
  propertySlug: "claim",
  definition: "what a finding says is so",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
