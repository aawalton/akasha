import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const executiveFunction = {
  id: "01a06594-c679-7005-9cbb-a7698c53ebbb",
  pageTypeSlug: "book-chapter",
  slug: "executive-function",
  title: "Executive function",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
