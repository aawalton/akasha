import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const trustCriterion = {
  id: "01a06594-c685-700b-b2ef-39b9a0c5dc28",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "trust-criterion",
  title: "Trust criterion",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
