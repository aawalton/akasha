import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChapterSlug = string

export const chapterSlug = {
  id: "01a06558-a991-7c59-a2e9-a75df34fb675",
  pageTypeSlug: "text-property",
  slug: "chapter-slug",
  propertySlug: "chapter-slug",
  definition: "the chapter of a story a naming stands in",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
