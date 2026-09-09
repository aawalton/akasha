import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherResidencySwitzerland = {
  id: "01a06594-c68c-7009-bfa1-dc29e2a81b0e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-switzerland",
  title: "Switzerland",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Switzerland residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
