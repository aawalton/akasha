import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const elevation = {
  id: "01a06594-c677-7015-a728-fc43e5b546d1",
  type: "page-type/book-section",
  slug: "elevation",
  title: "Elevation",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
