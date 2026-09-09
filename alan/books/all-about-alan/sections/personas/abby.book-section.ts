import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const abby = {
  id: "01a06594-c686-7006-a263-17503d3c33ab",
  pageTypeSlug: "book-section",
  slug: "abby",
  title: "Abby",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
