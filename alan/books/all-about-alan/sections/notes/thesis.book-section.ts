import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const thesis = {
  id: "01a06594-c685-7004-a3ae-84bca69080ef",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "thesis",
  title: "Thesis",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
