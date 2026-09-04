import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const personalContext = {
  id: "01a06594-c67c-7002-9a09-7ea028c3396e",
  pageTypeSlug: "book-chapter",
  slug: "personal-context",
  title: "Personal context",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
