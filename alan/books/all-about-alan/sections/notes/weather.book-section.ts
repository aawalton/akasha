import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const weather = {
  id: "01a06594-c686-7004-b7b2-720b2cf3bea1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "weather",
  title: "Weather",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
