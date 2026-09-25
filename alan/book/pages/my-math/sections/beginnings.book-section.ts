import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const beginnings = {
  id: "01a06594-c68e-700e-9219-31c312a83692",
  type: "page-type/book-section",
  slug: "beginnings",
  title: "My Math",
  sectionOf: "alan-book/my-math",
  position: 0,
  partOfCollections: ["alan-book/my-math"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
