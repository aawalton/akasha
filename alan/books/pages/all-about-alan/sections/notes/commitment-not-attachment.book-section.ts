import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const commitmentNotAttachment = {
  id: "01a06594-c676-700d-a590-5ab51251505b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "commitment-not-attachment",
  title: "Commitment, not attachment",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
