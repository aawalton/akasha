import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const personas = {
  id: "01a08860-b7b7-7576-8da6-1473c97f06f1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "personas",
  title: "Personas",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
