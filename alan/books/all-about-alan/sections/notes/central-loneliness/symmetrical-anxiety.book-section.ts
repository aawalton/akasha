import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const symmetricalAnxiety = {
  id: "01a06594-c676-7007-a73c-642f250bbdd4",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "symmetrical-anxiety",
  title: "The symmetrical anxiety",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
