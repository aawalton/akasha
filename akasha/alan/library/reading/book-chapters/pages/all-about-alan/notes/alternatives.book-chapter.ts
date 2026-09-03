import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const alternatives = {
  id: "01a06594-c674-700d-9d60-85204b73ee42",
  pageTypeSlug: "book-chapter",
  slug: "alternatives",
  title: "Alternatives",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
