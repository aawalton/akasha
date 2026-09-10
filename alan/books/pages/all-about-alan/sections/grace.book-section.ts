import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const grace = {
  id: "01a06594-c686-7013-befd-e5828d96b99d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "grace",
  title: "Grace",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/personas"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
