import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter002Crito = {
  id: "01a06594-c68f-700d-8e65-ec3f0fb13f41",
  type: "page-type/book-section",
  slug: "book-chapter-002-crito",
  title: "Crito",
  sectionOf: "book/plato-apology-crito",
  status: "completed",
  ownLength: 5341,
  position: 2,
  partOfCollections: ["book/plato-apology-crito"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
