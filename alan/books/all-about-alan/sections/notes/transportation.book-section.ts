import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const transportation = {
  id: "01a06594-c685-7008-bfff-d8c4fd92347e",
  pageTypeSlug: "book-section",
  slug: "transportation",
  title: "Transportation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
