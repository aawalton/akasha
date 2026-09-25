import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter003Priorities = {
  id: "01a06594-c68f-7003-8e17-f477f99cb9e5",
  type: "page-type/book-section",
  slug: "book-chapter-003-priorities",
  title: "The two orderings",
  sectionOf: "alan-book/my-strategy",
  position: 3,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
