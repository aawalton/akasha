import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const missionBreak = {
  id: "01a06594-c67b-7008-b871-43f8136ae0c8",
  type: "book-section",
  slug: "mission-break",
  title: "The mission break",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
