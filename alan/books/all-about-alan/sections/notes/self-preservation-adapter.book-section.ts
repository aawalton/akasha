import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const selfPreservationAdapter = {
  id: "01a06594-c683-7007-b5a8-071a23a765b1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-preservation-adapter",
  title: "The self-preservation adapter",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
