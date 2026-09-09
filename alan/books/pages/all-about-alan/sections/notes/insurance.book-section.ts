import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const insurance = {
  id: "01a06594-c67a-7011-b244-b64b22cf1bec",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "insurance",
  title: "Insurance",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
