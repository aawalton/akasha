import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type Claim = string

export const claim = {
  id: "01a04bc5-f8c4-7868-90c9-0a82060dd839",
  pageTypeSlug: "text-property",
  slug: "claim",
  definition: "what a finding says is so",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
