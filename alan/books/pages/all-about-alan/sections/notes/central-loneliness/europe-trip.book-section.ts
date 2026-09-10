import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const europeTrip = {
  id: "01a06594-c676-7002-889a-0afd9f3ed2a4",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "europe-trip",
  title: "The Europe trip",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
