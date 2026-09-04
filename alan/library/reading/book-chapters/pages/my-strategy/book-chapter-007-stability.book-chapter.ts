import type { BookChapter } from "../../book-chapter.page-type.ts"

export const bookChapter007Stability = {
  id: "01a06594-c68f-7007-9cd8-5c488565f63c",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-007-stability",
  title: "Where stability comes from",
  position: 7,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
