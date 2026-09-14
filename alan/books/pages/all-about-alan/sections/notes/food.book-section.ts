import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const food = {
  id: "01a06594-c679-7010-8ee4-24ff74080d7e",
  type: "book-section",
  slug: "food",
  title: "Food",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
