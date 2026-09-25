import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const finiteness = {
  id: "01a06594-c68e-7011-93aa-6503b1220d97",
  type: "page-type/book-section",
  slug: "finiteness",
  title: "The legible set is finite, and almost every real is illegible",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
