import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const tightClothing = {
  id: "01a06594-c685-7006-8a78-5686d9bfcb71",
  type: "page-type/book-section",
  slug: "tight-clothing",
  title: "Tight clothing",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
