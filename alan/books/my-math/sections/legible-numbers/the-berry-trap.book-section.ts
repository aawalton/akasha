import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const theBerryTrap = {
  id: "01a06594-c68e-7015-8832-15be56d3632d",
  pageTypeSlug: "book-section",
  slug: "the-berry-trap",
  title: "The Berry trap",
  sectionOf: "my-math",
  partOfCollections: ["my-math"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
