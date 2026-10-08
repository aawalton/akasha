import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const passiveIncome = {
  id: "01a06594-c68c-700c-a4ca-f059f98020e1",
  type: "page-type/book-section",
  slug: "passive-income",
  title: "Passive Income",
  sectionOf: "book-section/my-projects/second-passport",
  partOfCollections: ["book-section/my-projects/second-passport", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.108Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
