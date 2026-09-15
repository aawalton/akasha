import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const zeli = {
  id: "01a06594-c687-700c-9125-8d91b51525c1",
  type: "book-section",
  slug: "zeli",
  title: "Zeli",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
