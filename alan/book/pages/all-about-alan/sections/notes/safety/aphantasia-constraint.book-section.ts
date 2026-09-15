import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const aphantasiaConstraint = {
  id: "01a06594-c67e-7001-b9f9-775f31ca7746",
  type: "page-type/book-section",
  slug: "aphantasia-constraint",
  title: "Safety — the aphantasia constraint on intervention design",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/safety"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
