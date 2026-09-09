import type { BookSection } from "../../../library/reading/book-chapters/book-section.page-type.ts"

export const bookChapter007Stability = {
  id: "01a06594-c68f-7007-9cd8-5c488565f63c",
  pageTypeSlug: "book-section",
  slug: "book-chapter-007-stability",
  title: "Where stability comes from",
  sectionOf: "my-strategy",
  position: 7,
  partOfCollections: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
