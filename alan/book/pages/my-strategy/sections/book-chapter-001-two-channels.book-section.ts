import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter001TwoChannels = {
  id: "01a06594-c68f-7001-bed1-b81da26c402c",
  type: "page-type/book-section",
  slug: "book-chapter-001-two-channels",
  title: "The two channels",
  sectionOf: "alan-book/my-strategy",
  position: 1,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
