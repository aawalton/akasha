import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const beingKnownCost = {
  id: "01a06594-c675-7012-9692-169389c12da2",
  pageTypeSlug: "book-section",
  slug: "being-known-cost",
  title: "Being-known cost",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
