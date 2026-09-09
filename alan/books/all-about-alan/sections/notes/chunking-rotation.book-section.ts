import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const chunkingRotation = {
  id: "01a06594-c676-7009-8692-c39748264f8a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "chunking-rotation",
  title: "Chunking and rotation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
