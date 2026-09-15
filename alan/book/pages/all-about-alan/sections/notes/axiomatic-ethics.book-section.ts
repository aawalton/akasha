import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const axiomaticEthics = {
  id: "01a06594-c675-700e-b5b1-d52789b93962",
  type: "page-type/book-section",
  slug: "axiomatic-ethics",
  title: "Axiomatic Ethics with Perfect Knowledge",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
