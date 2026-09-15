import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const conceptualEmotionalWall = {
  id: "01a06594-c676-7013-933b-8166c0856049",
  type: "page-type/book-section",
  slug: "conceptual-emotional-wall",
  title: "The conceptual-emotional wall",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
