import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChapterNumbering = string

export const chapterNumbering = {
  id: "01a06577-f385-7bac-a762-2ea3397788a0",
  pageTypeSlug: "text-property",
  slug: "chapter-numbering",
  propertySlug: "chapter-numbering",
  definition: "how a story's chapters are counted",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
