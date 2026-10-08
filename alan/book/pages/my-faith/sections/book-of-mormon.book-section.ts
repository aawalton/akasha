import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookOfMormon = {
  id: "01a08861-b0d8-723b-af13-52fb08aaa872",
  type: "page-type/book-section",
  slug: "book-of-mormon",
  title: "The Book of Mormon",
  sectionOf: "book-section/my-faith/sources",
  partOfCollections: ["book-section/my-faith/sources", "alan-book/my-faith"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-09T22:54:58.776Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
