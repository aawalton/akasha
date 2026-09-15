import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const gradingScale = {
  id: "01a06594-c67a-7002-8289-094f32f578cf",
  type: "page-type/book-section",
  slug: "grading-scale",
  title: "Grading scale",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
