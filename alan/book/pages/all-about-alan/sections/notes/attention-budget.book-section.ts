import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const attentionBudget = {
  id: "01a06594-c674-7012-b787-41514cc04020",
  type: "page-type/book-section",
  slug: "attention-budget",
  title: "The attention budget",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
