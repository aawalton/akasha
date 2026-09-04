import type { BookChapter } from "../../../../../book-chapters/book-chapter.page-type.ts"

export const bookChapter002Crito = {
  id: "01a06594-c68f-700d-8e65-ec3f0fb13f41",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-002-crito",
  title: "Crito",
  status: "completed",
  ownLength: 5341,
  position: 2,
  partOfSlugs: ["plato-apology-crito"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
