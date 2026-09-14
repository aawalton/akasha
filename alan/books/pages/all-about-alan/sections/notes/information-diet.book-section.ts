import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const informationDiet = {
  id: "01a06594-c67a-700f-bc17-5ff2a88a909c",
  type: "book-section",
  slug: "information-diet",
  title: "Information diet",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
