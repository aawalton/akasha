import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const selfAsStrangers = {
  id: "01a06594-c683-7002-a561-9a2176490506",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-as-strangers",
  title: "The self as strangers",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
