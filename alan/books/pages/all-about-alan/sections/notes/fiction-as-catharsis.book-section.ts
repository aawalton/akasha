import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const fictionAsCatharsis = {
  id: "01a06594-c679-700d-9350-dde13748c84e",
  type: "book-section",
  slug: "fiction-as-catharsis",
  title: "Fiction-as-catharsis",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
