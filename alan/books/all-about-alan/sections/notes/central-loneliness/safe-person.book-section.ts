import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const safePerson = {
  id: "01a06594-c676-7005-88d1-37d8429e9208",
  pageTypeSlug: "book-section",
  slug: "safe-person",
  title: "The safe person and the broken covenant",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
