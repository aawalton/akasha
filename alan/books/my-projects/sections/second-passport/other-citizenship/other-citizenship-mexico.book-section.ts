import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipMexico = {
  id: "01a06594-c68b-7002-baa1-8a201b9c1377",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-citizenship-mexico",
  title: "Mexico",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Mexico citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
