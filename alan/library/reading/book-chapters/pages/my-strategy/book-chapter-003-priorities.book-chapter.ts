import type { BookChapter } from "../../book-chapter.page-type.ts"

export const bookChapter003Priorities = {
  id: "01a06594-c68f-7003-8e17-f477f99cb9e5",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-003-priorities",
  title: "The two orderings",
  position: 3,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
