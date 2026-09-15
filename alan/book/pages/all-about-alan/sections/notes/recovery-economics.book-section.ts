import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const recoveryEconomics = {
  id: "01a06594-c67c-700b-b2a4-139f2d95de63",
  type: "page-type/book-section",
  slug: "recovery-economics",
  title: "The economics of recovery",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
