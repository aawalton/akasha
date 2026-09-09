import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencySummary = {
  id: "01a06594-c68a-700b-8d39-888fc029cdbc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-summary",
  title: "Summary",
  sectionOf: "book-section/second-passport/eu-residency",
  partOfCollections: ["book-section/second-passport/eu-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
