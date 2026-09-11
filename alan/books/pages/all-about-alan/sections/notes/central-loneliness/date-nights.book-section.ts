import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const dateNights = {
  id: "01a06594-c676-7000-ab98-f51006094a4c",
  type: "book-section",
  slug: "date-nights",
  title: "The two date nights",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
