import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherResidencyLiechtenstein = {
  id: "01a06594-c68c-7001-bcdf-fb35a2347ac9",
  type: "page-type/book-section",
  slug: "other-residency-liechtenstein",
  title: "Liechtenstein",
  sectionOf: "book-section/second-passport/other-residency",
  description: "Liechtenstein residency paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
