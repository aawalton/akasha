import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bookChapter007Stability = {
  id: "01a06594-c68f-7007-9cd8-5c488565f63c",
  type: "page-type/book-section",
  slug: "book-chapter-007-stability",
  title: "Where stability comes from",
  sectionOf: "alan-book/my-strategy",
  position: 7,
  partOfCollections: ["alan-book/my-strategy"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
