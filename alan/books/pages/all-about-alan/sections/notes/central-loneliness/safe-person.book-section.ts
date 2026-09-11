import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const safePerson = {
  id: "01a06594-c676-7005-88d1-37d8429e9208",
  type: "book-section",
  slug: "safe-person",
  title: "The safe person and the broken covenant",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
