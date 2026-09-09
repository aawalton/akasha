import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencySummary = {
  id: "01a06594-c68c-7008-b174-35243ceec850",
  pageTypeSlug: "book-section",
  slug: "other-residency-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/other-residency",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
