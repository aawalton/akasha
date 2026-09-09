import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const broadLearning = {
  id: "01a06594-c675-7016-a681-40c67b4c58fc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "broad-learning",
  title: "Broad learning",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
