import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const missionBreak = {
  id: "01a06594-c67b-7008-b871-43f8136ae0c8",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "mission-break",
  title: "The mission break",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
