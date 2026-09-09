import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencySouthKorea = {
  id: "01a06594-c68c-7007-8b6a-9ba2cc57ce85",
  pageTypeSlug: "book-section",
  slug: "other-residency-south-korea",
  title: "South Korea",
  sectionOf: "book-section/second-passport/other-residency",
  description: "South Korea residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
