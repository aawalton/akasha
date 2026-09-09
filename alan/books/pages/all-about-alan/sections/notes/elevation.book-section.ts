import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const elevation = {
  id: "01a06594-c677-7015-a728-fc43e5b546d1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "elevation",
  title: "Elevation",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
