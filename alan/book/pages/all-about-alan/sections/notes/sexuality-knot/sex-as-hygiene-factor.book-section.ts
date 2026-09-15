import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const sexAsHygieneFactor = {
  id: "01a06594-c683-7010-a1f0-151de0df3c4c",
  type: "book-section",
  slug: "sex-as-hygiene-factor",
  title: "Sex as a hygiene factor, not a core support",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/sexuality-knot"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
