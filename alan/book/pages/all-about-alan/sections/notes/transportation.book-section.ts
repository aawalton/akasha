import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const transportation = {
  id: "01a06594-c685-7008-bfff-d8c4fd92347e",
  type: "page-type/book-section",
  slug: "transportation",
  title: "Transportation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
