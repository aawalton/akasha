import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const accommodationNotExcuse = {
  id: "01a06594-c674-7004-a42c-c1af0b58123b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "accommodation-not-excuse",
  title: "Accommodation, not excuse",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
