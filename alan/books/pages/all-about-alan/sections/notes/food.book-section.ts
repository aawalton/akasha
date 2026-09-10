import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const food = {
  id: "01a06594-c679-7010-8ee4-24ff74080d7e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "food",
  title: "Food",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
