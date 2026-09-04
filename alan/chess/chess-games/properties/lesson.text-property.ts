import type { TextProperty } from "@akasha/pages-system/text-property"

export type Lesson = string

export const lesson = {
  id: "01a06582-bd62-7222-ae5c-1f8e31015884",
  pageTypeSlug: "text-property",
  slug: "lesson",
  propertySlug: "lesson",
  definition: "what one game teaches",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
