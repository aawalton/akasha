import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const extinctionModel = {
  id: "01a06594-c67e-7002-9681-8f67a6bcd71e",
  type: "page-type/book-section",
  slug: "extinction-model",
  title: "Safety — the extinction model",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/safety"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
