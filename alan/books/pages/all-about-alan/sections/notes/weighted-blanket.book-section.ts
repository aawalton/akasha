import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const weightedBlanket = {
  id: "01a06594-c686-7005-90b6-dce81da056fc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "weighted-blanket",
  title: "Weighted blanket",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
