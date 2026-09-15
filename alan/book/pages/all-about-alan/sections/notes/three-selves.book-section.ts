import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const threeSelves = {
  id: "01a06594-c685-7005-ac68-60f81e408004",
  type: "page-type/book-section",
  slug: "three-selves",
  title: "The three selves",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
