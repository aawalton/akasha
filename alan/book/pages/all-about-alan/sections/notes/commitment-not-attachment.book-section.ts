import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const commitmentNotAttachment = {
  id: "01a06594-c676-700d-a590-5ab51251505b",
  type: "book-section",
  slug: "commitment-not-attachment",
  title: "Commitment, not attachment",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
