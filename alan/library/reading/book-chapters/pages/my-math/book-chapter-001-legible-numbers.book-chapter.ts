import type { BookChapter } from "../../book-chapter.page-type.ts"

export const bookChapter001LegibleNumbers = {
  id: "01a06594-c68e-700f-93ce-2a86b9ca94c0",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-001-legible-numbers",
  title: "Legible numbers",
  position: 1,
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
