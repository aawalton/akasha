import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const noSelfDecoder = {
  id: "01a06594-c68e-7012-a1fe-2268bcd4491b",
  type: "page-type/book-section",
  slug: "no-self-decoder",
  title: "No universe decodes itself",
  sectionOf: "alan-book/my-math",
  partOfCollections: ["alan-book/my-math", "book-section/my-math/legible-numbers"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
