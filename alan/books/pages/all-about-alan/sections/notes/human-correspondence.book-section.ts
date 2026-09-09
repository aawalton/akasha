import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const humanCorrespondence = {
  id: "01a06594-c67a-7009-a4db-f8d25dd2bf49",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "human-correspondence",
  title: "Human correspondence",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
