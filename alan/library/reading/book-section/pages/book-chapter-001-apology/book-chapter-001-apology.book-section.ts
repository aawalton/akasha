import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const bookChapter001Apology = {
  id: "01a06594-c68f-700c-9128-592393371e5c",
  type: "book-section",
  slug: "book-chapter-001-apology",
  title: "Apology",
  sectionOf: "book/plato-apology-crito",
  status: "completed",
  ownLength: 11346,
  position: 1,
  partOfCollections: ["book/plato-apology-crito"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
