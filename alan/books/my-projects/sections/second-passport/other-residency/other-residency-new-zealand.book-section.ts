import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyNewZealand = {
  id: "01a06594-c68c-7004-88c5-e6913c9c1e4e",
  pageTypeSlug: "book-section",
  slug: "other-residency-new-zealand",
  title: "New Zealand",
  sectionOfSlug: "book-section/second-passport/other-residency",
  description: "New Zealand residency paths (May 2026 snapshot).",
  partOfSlugs: ["book-section/second-passport/other-residency"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
