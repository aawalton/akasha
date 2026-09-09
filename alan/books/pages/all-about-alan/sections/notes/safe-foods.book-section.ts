import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const safeFoods = {
  id: "01a06594-c67c-7016-a28f-a3a82cef38de",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "safe-foods",
  title: "Safe foods",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
