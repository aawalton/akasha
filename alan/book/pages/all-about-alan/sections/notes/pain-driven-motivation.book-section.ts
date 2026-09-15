import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const painDrivenMotivation = {
  id: "01a06594-c67b-7012-b856-76b6b57a4aa5",
  type: "page-type/book-section",
  slug: "pain-driven-motivation",
  title: "Pain-driven motivation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
