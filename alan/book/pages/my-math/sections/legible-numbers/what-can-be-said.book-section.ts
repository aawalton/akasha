import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const whatCanBeSaid = {
  id: "01a06594-c68e-7017-9a4c-626e6985ba96",
  type: "page-type/book-section",
  slug: "what-can-be-said",
  title: "What can be said about an illegible number",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
