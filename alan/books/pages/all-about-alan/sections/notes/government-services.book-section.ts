import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const governmentServices = {
  id: "01a06594-c67a-7000-8c5e-a807d85056b0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "government-services",
  title: "Government services",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
