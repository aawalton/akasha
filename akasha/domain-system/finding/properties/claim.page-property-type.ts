import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Claim = string

export const claim = {
  id: "01a04bc5-f8c4-7868-90c9-0a82060dd839",
  pageTypeSlug: "page-property-type",
  slug: "claim",
  definition: "what a finding says is so",
  extendsSlug: "page-property-type/page-property",
  kind: "text",
  max: 500,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
