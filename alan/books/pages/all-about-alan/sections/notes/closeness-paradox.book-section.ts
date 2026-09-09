import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const closenessParadox = {
  id: "01a06594-c676-700b-8ada-79196b7ec20b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "closeness-paradox",
  title: "The closeness paradox",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
