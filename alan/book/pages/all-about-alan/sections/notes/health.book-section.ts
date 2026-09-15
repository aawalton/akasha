import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const health = {
  id: "01a06594-c67a-7004-bdf2-242c2201652d",
  type: "page-type/book-section",
  slug: "health",
  title: "Health",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
