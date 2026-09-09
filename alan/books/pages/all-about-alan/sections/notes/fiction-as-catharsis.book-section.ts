import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const fictionAsCatharsis = {
  id: "01a06594-c679-700d-9350-dde13748c84e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "fiction-as-catharsis",
  title: "Fiction-as-catharsis",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
