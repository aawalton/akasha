import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const prayer = {
  id: "01a06594-c67c-7005-88c7-e28450d30ba1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "prayer",
  title: "Prayer",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
