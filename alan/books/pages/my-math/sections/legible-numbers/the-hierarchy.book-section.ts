import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const theHierarchy = {
  id: "01a06594-c68e-7016-93ec-ab98c91a950c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "the-hierarchy",
  title: "The hierarchy, and the index on the word",
  sectionOf: "my-math",
  partOfCollections: ["my-math"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
