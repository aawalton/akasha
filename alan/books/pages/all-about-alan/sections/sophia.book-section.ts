import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const sophia = {
  id: "01a06594-c687-7009-8721-4fa9a964d0b2",
  type: "book-section",
  slug: "sophia",
  title: "Sophia",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
