import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const slowBuildStrategy = {
  id: "01a06594-c684-7005-abd5-425a38eb1177",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "slow-build-strategy",
  title: "Slow-build strategy",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
