import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const selfPreservationAdapter = {
  id: "01a06594-c683-7007-b5a8-071a23a765b1",
  type: "book-section",
  slug: "self-preservation-adapter",
  title: "The self-preservation adapter",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
