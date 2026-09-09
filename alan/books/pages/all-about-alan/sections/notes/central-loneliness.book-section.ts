import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const centralLoneliness = {
  id: "01a06594-c676-7008-a502-c912e50fc630",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "central-loneliness",
  title: "Central loneliness",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
