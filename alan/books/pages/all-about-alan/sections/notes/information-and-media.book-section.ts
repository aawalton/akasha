import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const informationAndMedia = {
  id: "01a06594-c67a-700e-b08b-e7f748c7065f",
  type: "book-section",
  slug: "information-and-media",
  title: "Information and media",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
