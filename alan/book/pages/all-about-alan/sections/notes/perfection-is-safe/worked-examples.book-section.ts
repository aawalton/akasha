import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const workedExamples = {
  id: "01a06594-c67b-7016-bdaf-16bdfe0b59e2",
  type: "book-section",
  slug: "worked-examples",
  title: "The worked-examples wall",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/perfection-is-safe"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
