import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const theBerryTrap = {
  id: "01a06594-c68e-7015-8832-15be56d3632d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "the-berry-trap",
  title: "The Berry trap",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/book-chapter-001-legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
