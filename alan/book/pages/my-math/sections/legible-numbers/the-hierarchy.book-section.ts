import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const theHierarchy = {
  id: "01a06594-c68e-7016-93ec-ab98c91a950c",
  type: "page-type/book-section",
  slug: "the-hierarchy",
  title: "The hierarchy, and the index on the word",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
