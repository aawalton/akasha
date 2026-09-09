import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const lifeChronology = {
  id: "01a06594-c67a-7018-b88f-d7de3e73b6c9",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "life-chronology",
  title: "Life chronology",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
