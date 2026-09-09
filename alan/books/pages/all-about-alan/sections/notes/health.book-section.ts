import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const health = {
  id: "01a06594-c67a-7004-bdf2-242c2201652d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "health",
  title: "Health",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
