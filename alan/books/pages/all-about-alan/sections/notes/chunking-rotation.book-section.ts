import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const chunkingRotation = {
  id: "01a06594-c676-7009-8692-c39748264f8a",
  type: "book-section",
  slug: "chunking-rotation",
  title: "Chunking and rotation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
