import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const bookChapter005ThePipeline = {
  id: "01a06594-c68f-7005-9894-51d332cff538",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "book-chapter-005-the-pipeline",
  title: "The pipeline",
  sectionOf: "my-strategy",
  position: 5,
  partOfCollections: ["my-strategy"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
