import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const provableLegibility = {
  id: "01a06594-c68e-7013-92bd-29e9e15cc177",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "provable-legibility",
  title: "Provable legibility",
  sectionOf: "my-math",
  partOfCollections: ["my-math", "book-section/my-math/legible-numbers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
