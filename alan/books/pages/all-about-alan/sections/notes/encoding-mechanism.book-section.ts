import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const encodingMechanism = {
  id: "01a06594-c679-7000-9e70-9037a1e4b979",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "encoding-mechanism",
  title: "Encoding mechanism",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
