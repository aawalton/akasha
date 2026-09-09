import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const zeli = {
  id: "01a06594-c687-700c-9125-8d91b51525c1",
  pageTypeSlug: "book-section",
  slug: "zeli",
  title: "Zeli",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
