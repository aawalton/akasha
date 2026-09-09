import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const closenessParadox = {
  id: "01a06594-c676-700b-8ada-79196b7ec20b",
  pageTypeSlug: "book-section",
  slug: "closeness-paradox",
  title: "The closeness paradox",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
