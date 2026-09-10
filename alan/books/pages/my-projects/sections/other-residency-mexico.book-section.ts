import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const otherResidencyMexico = {
  id: "01a06594-c68c-7002-9120-3dad5c9ceff1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-mexico",
  title: "Mexico",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Mexico residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
