import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const slowBuildStrategy = {
  id: "01a06594-c684-7005-abd5-425a38eb1177",
  type: "page-type/book-section",
  slug: "slow-build-strategy",
  title: "Slow-build strategy",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
