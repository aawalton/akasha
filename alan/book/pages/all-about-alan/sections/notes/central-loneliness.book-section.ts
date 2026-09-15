import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const centralLoneliness = {
  id: "01a06594-c676-7008-a502-c912e50fc630",
  type: "page-type/book-section",
  slug: "central-loneliness",
  title: "Central loneliness",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
