import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const abby = {
  id: "01a06594-c686-7006-a263-17503d3c33ab",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "abby",
  title: "Abby",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
