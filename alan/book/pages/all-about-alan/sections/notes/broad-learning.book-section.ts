import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const broadLearning = {
  id: "01a06594-c675-7016-a681-40c67b4c58fc",
  type: "page-type/book-section",
  slug: "broad-learning",
  title: "Broad learning",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
