import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const trustCriterion = {
  id: "01a06594-c685-700b-b2ef-39b9a0c5dc28",
  type: "book-section",
  slug: "trust-criterion",
  title: "Trust criterion",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
