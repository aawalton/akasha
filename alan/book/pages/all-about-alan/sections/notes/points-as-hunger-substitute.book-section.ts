import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const pointsAsHungerSubstitute = {
  id: "01a06594-c67c-7003-8185-07e171dd7bc5",
  type: "page-type/book-section",
  slug: "points-as-hunger-substitute",
  title: "Points as a hunger substitute",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
