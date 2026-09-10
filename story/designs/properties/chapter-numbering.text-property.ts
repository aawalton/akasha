import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ChapterNumbering = string

export const chapterNumbering = {
  id: "01a06577-f385-7bac-a762-2ea3397788a0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "chapter-numbering",
  propertySlug: "chapter-numbering",
  definition: "how a story's chapters are counted",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
