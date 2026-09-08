import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencySummary = {
  id: "01a06594-c68a-700b-8d39-888fc029cdbc",
  pageTypeSlug: "book-section",
  slug: "eu-residency-summary",
  title: "Summary",
  sectionOfSlug: "book-section/second-passport/eu-residency",
  partOfSlugs: ["book-section/second-passport/eu-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
