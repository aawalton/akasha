import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const talia = {
  id: "01a06594-c687-700a-873d-f71418d104c9",
  type: "book-section",
  slug: "talia",
  title: "Talia",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
