import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const sources = {
  id: "01a08861-8fad-7611-ab85-593238d19e93",
  type: "page-type/book-section",
  slug: "sources",
  title: "Sources",
  sectionOf: "alan-book/my-faith",
  partOfCollections: ["alan-book/my-faith"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-09T22:54:50.285Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
