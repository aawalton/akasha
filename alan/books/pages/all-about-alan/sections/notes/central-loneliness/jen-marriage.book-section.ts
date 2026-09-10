import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const jenMarriage = {
  id: "01a06594-c676-7003-a220-80dbfc3f9cbe",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "jen-marriage",
  title: "The marriage conflict mechanics",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
