import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const sexualityKnot = {
  id: "01a06594-c684-7001-b189-6a9515a83866",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sexuality-knot",
  title: "The sexuality knot",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
