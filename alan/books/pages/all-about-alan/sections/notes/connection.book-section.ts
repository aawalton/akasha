import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const connection = {
  id: "01a06594-c677-7004-be1f-d41df99ede57",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "connection",
  title: "Connection",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
