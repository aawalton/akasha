import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const fun = {
  id: "01a06594-c679-7013-b6f5-9640c8b9b691",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "fun",
  title: "Fun",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
