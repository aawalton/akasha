import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const selfAsStrangers = {
  id: "01a06594-c683-7002-a561-9a2176490506",
  type: "page-type/book-section",
  slug: "self-as-strangers",
  title: "The self as strangers",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
