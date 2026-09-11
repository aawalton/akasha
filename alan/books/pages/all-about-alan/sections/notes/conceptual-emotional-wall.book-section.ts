import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const conceptualEmotionalWall = {
  id: "01a06594-c676-7013-933b-8166c0856049",
  type: "book-section",
  slug: "conceptual-emotional-wall",
  title: "The conceptual-emotional wall",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
