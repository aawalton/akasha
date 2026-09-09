import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const finances = {
  id: "01a06594-c679-700e-a250-575c71312a7d",
  pageTypeSlug: "book-section",
  slug: "finances",
  title: "Finances",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
