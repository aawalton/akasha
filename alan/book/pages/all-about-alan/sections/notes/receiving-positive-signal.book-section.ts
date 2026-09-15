import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const receivingPositiveSignal = {
  id: "01a06594-c67c-7009-b01e-978647cc71dd",
  type: "page-type/book-section",
  slug: "receiving-positive-signal",
  title: "Receiving positive signal",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
