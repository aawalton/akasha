import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const jenReading = {
  id: "01a06594-c676-7004-a164-d2ba4de87164",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "jen-reading",
  title: "The Jen reading",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
