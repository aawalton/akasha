import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const grace = {
  id: "01a06594-c686-7013-befd-e5828d96b99d",
  pageTypeSlug: "book-section",
  slug: "grace",
  title: "Grace",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
