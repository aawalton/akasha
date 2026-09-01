import type { TextProperty } from "@akasha/pages-system/text-property"

export type DisplayName = string

export const displayName = {
  id: "01a0597a-8ead-7ee4-a22f-6a01b0e80d4d",
  pageTypeSlug: "text-property",
  slug: "display-name",
  propertySlug: "display-name",
  definition: "the name standing under an app's icon",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
