import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const beginnings = {
  id: "01a06594-c68f-7000-934e-35dfe3dc5ddf",
  type: "page-type/book-section",
  slug: "beginnings",
  title: "My Strategy",
  sectionOf: "alan-book/my-strategy",
  position: 0,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
