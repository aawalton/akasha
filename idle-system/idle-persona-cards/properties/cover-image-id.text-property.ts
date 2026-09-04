import type { TextProperty } from "@akasha/pages-system/text-property"

export type CoverImageId = string

export const coverImageId = {
  id: "01a06596-f0d5-7009-9355-444abe7abd10",
  pageTypeSlug: "text-property",
  slug: "cover-image-id",
  propertySlug: "cover-image-id",
  definition: "the picture a card is shown by",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
} as const satisfies TextProperty
