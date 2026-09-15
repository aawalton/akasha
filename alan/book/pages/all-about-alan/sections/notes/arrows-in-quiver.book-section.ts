import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const arrowsInQuiver = {
  id: "01a06594-c674-7011-bbef-b6c2b348017a",
  type: "page-type/book-section",
  slug: "arrows-in-quiver",
  title: "Arrows in quiver",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
