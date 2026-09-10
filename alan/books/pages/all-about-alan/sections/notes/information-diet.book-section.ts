import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const informationDiet = {
  id: "01a06594-c67a-700f-bc17-5ff2a88a909c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "information-diet",
  title: "Information diet",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
