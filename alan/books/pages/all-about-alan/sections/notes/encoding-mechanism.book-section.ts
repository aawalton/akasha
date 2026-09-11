import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const encodingMechanism = {
  id: "01a06594-c679-7000-9e70-9037a1e4b979",
  type: "book-section",
  slug: "encoding-mechanism",
  title: "Encoding mechanism",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
