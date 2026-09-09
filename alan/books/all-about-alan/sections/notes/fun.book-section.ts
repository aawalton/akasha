import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const fun = {
  id: "01a06594-c679-7013-b6f5-9640c8b9b691",
  pageTypeSlug: "book-section",
  slug: "fun",
  title: "Fun",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
