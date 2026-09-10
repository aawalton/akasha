import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const legibleNumbers = {
  id: "01a06594-c68e-700f-93ce-2a86b9ca94c0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "legible-numbers",
  title: "Legible numbers",
  sectionOf: "my-math",
  position: 1,
  partOfCollections: ["my-math"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
