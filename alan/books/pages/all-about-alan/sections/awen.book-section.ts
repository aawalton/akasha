import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const awen = {
  id: "01a06594-c686-700e-9cff-83905d41179b",
  type: "book-section",
  slug: "awen",
  title: "Awen",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
