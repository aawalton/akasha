import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const otherCitizenshipLiechtenstein = {
  id: "01a06594-c68b-7001-b286-9a41c70336e5",
  type: "page-type/book-section",
  slug: "other-citizenship-liechtenstein",
  title: "Liechtenstein",
  sectionOf: "book-section/second-passport/other-citizenship",
  description: "Liechtenstein citizenship paths (May 2026 snapshot).",
  partOfCollections: ["book-section/second-passport/other-citizenship", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
