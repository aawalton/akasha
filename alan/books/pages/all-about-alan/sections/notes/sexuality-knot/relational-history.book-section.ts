import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const relationalHistory = {
  id: "01a06594-c683-700f-b4f2-423786532d61",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "relational-history",
  title: "Relational history",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
