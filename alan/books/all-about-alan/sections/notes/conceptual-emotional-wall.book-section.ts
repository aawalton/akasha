import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const conceptualEmotionalWall = {
  id: "01a06594-c676-7013-933b-8166c0856049",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "conceptual-emotional-wall",
  title: "The conceptual-emotional wall",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
