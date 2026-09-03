import type { TextProperty } from "@akasha/pages-system/text-property"

export type Claim = string

export const claim = {
  id: "01a04bc5-f8c4-7868-90c9-0a82060dd839",
  pageTypeSlug: "text-property",
  slug: "claim",
  propertySlug: "claim",
  definition: "what a finding says is so",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
