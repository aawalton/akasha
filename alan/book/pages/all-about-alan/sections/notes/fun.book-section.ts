import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const fun = {
  id: "01a06594-c679-7013-b6f5-9640c8b9b691",
  type: "page-type/book-section",
  slug: "fun",
  title: "Fun",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
