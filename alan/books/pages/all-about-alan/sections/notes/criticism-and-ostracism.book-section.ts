import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const criticismAndOstracism = {
  id: "01a06594-c677-700a-aab5-ceb23acd0cf4",
  type: "book-section",
  slug: "criticism-and-ostracism",
  title: "Criticism and ostracism",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
