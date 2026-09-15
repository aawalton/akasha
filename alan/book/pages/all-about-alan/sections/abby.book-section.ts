import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const abby = {
  id: "01a06594-c686-7006-a263-17503d3c33ab",
  type: "page-type/book-section",
  slug: "abby",
  title: "Abby",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
