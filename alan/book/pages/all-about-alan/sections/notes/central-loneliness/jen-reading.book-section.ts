import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const jenReading = {
  id: "01a06594-c676-7004-a164-d2ba4de87164",
  type: "page-type/book-section",
  slug: "jen-reading",
  title: "The Jen reading",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
