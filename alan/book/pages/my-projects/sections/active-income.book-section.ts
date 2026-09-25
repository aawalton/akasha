import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const activeIncome = {
  id: "01a06594-c687-700d-ba67-d9f7ce885710",
  type: "page-type/book-section",
  slug: "active-income",
  title: "Active Income",
  sectionOf: "book-section/my-projects/second-passport",
  partOfCollections: ["book-section/my-projects/second-passport", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
