import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const finances = {
  id: "01a06594-c679-700e-a250-575c71312a7d",
  type: "book-section",
  slug: "finances",
  title: "Finances",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
