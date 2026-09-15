import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const aria = {
  id: "01a06594-c686-700b-beee-930f2da17073",
  type: "page-type/book-section",
  slug: "aria",
  title: "Aria",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
