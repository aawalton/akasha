import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const swissCheese = {
  id: "01a06594-c68e-7014-adba-e57d0e73f61c",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "swiss-cheese",
  title: "The legible integers are Swiss cheese",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/book-chapter-001-legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
