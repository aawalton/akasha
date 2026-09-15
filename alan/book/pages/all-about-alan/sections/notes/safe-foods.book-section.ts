import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const safeFoods = {
  id: "01a06594-c67c-7016-a28f-a3a82cef38de",
  type: "book-section",
  slug: "safe-foods",
  title: "Safe foods",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
