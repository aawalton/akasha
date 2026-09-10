import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const faithFeltChannel = {
  id: "01a06594-c679-7009-8bf9-4c85eebf0036",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "faith-felt-channel",
  title: "The felt channel of faith",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
