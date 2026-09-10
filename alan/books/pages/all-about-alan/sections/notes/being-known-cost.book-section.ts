import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const beingKnownCost = {
  id: "01a06594-c675-7012-9692-169389c12da2",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "being-known-cost",
  title: "Being-known cost",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
