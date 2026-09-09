import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const aria = {
  id: "01a06594-c686-700b-beee-930f2da17073",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "aria",
  title: "Aria",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
