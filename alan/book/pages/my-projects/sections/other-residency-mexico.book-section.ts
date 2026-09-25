import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyMexico = {
  id: "01a06594-c68c-7002-9120-3dad5c9ceff1",
  type: "page-type/book-section",
  slug: "other-residency-mexico",
  title: "Mexico",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Mexico residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
