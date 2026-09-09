import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const food = {
  id: "01a06594-c679-7010-8ee4-24ff74080d7e",
  pageTypeSlug: "book-section",
  slug: "food",
  title: "Food",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
