import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ChapterNumber = number

export const chapterNumber = {
  id: "01a06577-f385-7786-a0f1-67d9d9f258b8",
  pageTypeSlug: "number-property",
  slug: "chapter-number",
  propertySlug: "chapter-number",
  definition: "the chapter of a story something is read as of",
  max: null,
} as const satisfies NumberProperty
