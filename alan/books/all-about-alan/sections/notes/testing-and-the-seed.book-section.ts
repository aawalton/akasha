import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const testingAndTheSeed = {
  id: "01a06594-c685-7002-83e2-32286a83802a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "testing-and-the-seed",
  title: "Testing and the seed",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
