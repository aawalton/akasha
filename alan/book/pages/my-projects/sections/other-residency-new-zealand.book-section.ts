import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyNewZealand = {
  id: "01a06594-c68c-7004-88c5-e6913c9c1e4e",
  type: "page-type/book-section",
  slug: "other-residency-new-zealand",
  title: "New Zealand",
  sectionOf: "book-section/second-passport/other-residency",
  description: "New Zealand residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
