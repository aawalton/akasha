import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const selfAsStrangers = {
  id: "01a06594-c683-7002-a561-9a2176490506",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-as-strangers",
  title: "The self as strangers",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
