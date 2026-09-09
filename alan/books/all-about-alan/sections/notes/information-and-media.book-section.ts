import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const informationAndMedia = {
  id: "01a06594-c67a-700e-b08b-e7f748c7065f",
  pageTypeSlug: "book-section",
  slug: "information-and-media",
  title: "Information and media",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
