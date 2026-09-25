import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const abstractionMap = {
  id: "01a06594-c68e-700d-b690-848031a7a0ed",
  type: "page-type/book-section",
  slug: "abstraction-map",
  title: "Domain abstraction map — The Book of Mormon (Layer 1)",
  sectionOf: "alan-book/my-faith",
  partOfCollections: ["alan-book/my-faith", "book-section/sources/book-of-mormon"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
