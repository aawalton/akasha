import type { TextProperty } from "@akasha/pages-system/text-property"

export type MemberName = string

export const memberName = {
  id: "01a06838-7a9e-70f2-8639-14c82d25d28a",
  pageTypeSlug: "text-property",
  slug: "member-name",
  propertySlug: "member-name",
  definition: "what one member of a list is called",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
