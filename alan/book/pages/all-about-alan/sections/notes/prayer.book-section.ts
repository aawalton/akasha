import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const prayer = {
  id: "01a06594-c67c-7005-88c7-e28450d30ba1",
  type: "page-type/book-section",
  slug: "prayer",
  title: "Prayer",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
