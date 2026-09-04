import type { FileProperty } from "@akasha/pages-system/file-property"

export type ChapterText = "md"

export const chapterText = {
  id: "01a0658d-fe50-7000-8c31-32dfa5d0bba8",
  pageTypeSlug: "file-property",
  slug: "chapter-text",
  propertySlug: "chapter-text",
  definition: "the prose a chapter is made of",
} as const satisfies FileProperty
