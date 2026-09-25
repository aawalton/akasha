import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const swissCheese = {
  id: "01a06594-c68e-7014-adba-e57d0e73f61c",
  type: "page-type/book-section",
  slug: "swiss-cheese",
  title: "The legible integers are Swiss cheese",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
