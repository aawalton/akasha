import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter005ThePipeline = {
  id: "01a06594-c68f-7005-9894-51d332cff538",
  type: "page-type/book-section",
  slug: "book-chapter-005-the-pipeline",
  title: "The pipeline",
  sectionOf: "alan-book/my-strategy",
  position: 5,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
