import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const otherResidencyNewZealand = {
  id: "01a06594-c68c-7004-88c5-e6913c9c1e4e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "other-residency-new-zealand",
  title: "New Zealand",
  sectionOf: "book-section/second-passport/other-residency",
  description: "New Zealand residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
