import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const talia = {
  id: "01a06594-c687-700a-873d-f71418d104c9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "talia",
  title: "Talia",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
