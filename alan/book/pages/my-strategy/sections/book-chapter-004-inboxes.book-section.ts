import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter004Inboxes = {
  id: "01a06594-c68f-7004-bc4f-08f16f304f01",
  type: "page-type/book-section",
  slug: "book-chapter-004-inboxes",
  title: "My inboxes",
  sectionOf: "alan-book/my-strategy",
  position: 4,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
