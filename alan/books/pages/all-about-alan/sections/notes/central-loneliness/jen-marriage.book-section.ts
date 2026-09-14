import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const jenMarriage = {
  id: "01a06594-c676-7003-a220-80dbfc3f9cbe",
  type: "book-section",
  slug: "jen-marriage",
  title: "The marriage conflict mechanics",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
