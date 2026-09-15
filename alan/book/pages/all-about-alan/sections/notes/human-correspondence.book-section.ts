import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const humanCorrespondence = {
  id: "01a06594-c67a-7009-a4db-f8d25dd2bf49",
  type: "page-type/book-section",
  slug: "human-correspondence",
  title: "Human correspondence",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
