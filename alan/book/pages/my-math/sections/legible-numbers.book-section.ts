import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const legibleNumbers = {
  id: "01a06594-c68e-700f-93ce-2a86b9ca94c0",
  type: "page-type/book-section",
  slug: "legible-numbers",
  title: "Legible numbers",
  sectionOf: "alan-book/my-math",
  position: 1,
  partOfCollections: ["alan-book/my-math"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.110Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
