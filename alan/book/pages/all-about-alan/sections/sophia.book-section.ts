import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const sophia = {
  id: "01a06594-c687-7009-8721-4fa9a964d0b2",
  type: "page-type/book-section",
  slug: "sophia",
  title: "Sophia",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/personas"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
