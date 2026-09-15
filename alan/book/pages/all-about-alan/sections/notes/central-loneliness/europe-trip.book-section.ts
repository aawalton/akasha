import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const europeTrip = {
  id: "01a06594-c676-7002-889a-0afd9f3ed2a4",
  type: "page-type/book-section",
  slug: "europe-trip",
  title: "The Europe trip",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
