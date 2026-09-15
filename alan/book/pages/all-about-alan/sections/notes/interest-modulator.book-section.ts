import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const interestModulator = {
  id: "01a06594-c67a-7012-b964-8d98a1776caf",
  type: "page-type/book-section",
  slug: "interest-modulator",
  title: "Interest modulator",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
