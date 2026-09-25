import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const theBerryTrap = {
  id: "01a06594-c68e-7015-8832-15be56d3632d",
  type: "page-type/book-section",
  slug: "the-berry-trap",
  title: "The Berry trap",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
