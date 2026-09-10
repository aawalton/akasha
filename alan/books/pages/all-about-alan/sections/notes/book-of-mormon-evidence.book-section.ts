import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const bookOfMormonEvidence = {
  id: "01a06594-c675-7015-85dd-2d7913784b1e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "book-of-mormon-evidence",
  title: "Book of Mormon evidence",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
