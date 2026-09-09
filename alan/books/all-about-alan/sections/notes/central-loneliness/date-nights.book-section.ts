import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const dateNights = {
  id: "01a06594-c676-7000-ab98-f51006094a4c",
  pageTypeSlug: "book-section",
  slug: "date-nights",
  title: "The two date nights",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
