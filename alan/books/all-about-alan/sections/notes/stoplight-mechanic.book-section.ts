import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const stoplightMechanic = {
  id: "01a06594-c684-7011-a711-91f52cefe07f",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "stoplight-mechanic",
  title: "The stoplight mechanic",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
