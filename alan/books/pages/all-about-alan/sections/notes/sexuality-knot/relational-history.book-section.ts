import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const relationalHistory = {
  id: "01a06594-c683-700f-b4f2-423786532d61",
  type: "book-section",
  slug: "relational-history",
  title: "Relational history",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/sexuality-knot"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
