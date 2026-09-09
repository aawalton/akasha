import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const astra = {
  id: "01a06594-c686-700c-8a62-27d37b331f77",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "astra",
  title: "Astra",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
