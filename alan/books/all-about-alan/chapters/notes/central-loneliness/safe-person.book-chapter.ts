import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const safePerson = {
  id: "01a06594-c676-7005-88d1-37d8429e9208",
  pageTypeSlug: "book-chapter",
  slug: "safe-person",
  title: "The safe person and the broken covenant",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
