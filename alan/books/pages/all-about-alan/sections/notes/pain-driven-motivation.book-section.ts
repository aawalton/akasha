import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const painDrivenMotivation = {
  id: "01a06594-c67b-7012-b856-76b6b57a4aa5",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "pain-driven-motivation",
  title: "Pain-driven motivation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
