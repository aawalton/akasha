import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const perfectionIsSafe = {
  id: "01a06594-c67c-7000-abb1-7fec74def8d3",
  type: "book-section",
  slug: "perfection-is-safe",
  title: "Only perfection is safe",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
