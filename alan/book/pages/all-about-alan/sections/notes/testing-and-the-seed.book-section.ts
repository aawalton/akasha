import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const testingAndTheSeed = {
  id: "01a06594-c685-7002-83e2-32286a83802a",
  type: "page-type/book-section",
  slug: "testing-and-the-seed",
  title: "Testing and the seed",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
