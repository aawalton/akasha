import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const inverseRoutes = {
  id: "01a06594-c67a-7013-82e9-460ab443bb34",
  type: "book-section",
  slug: "inverse-routes",
  title: "Inverse routes to the same interior",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
