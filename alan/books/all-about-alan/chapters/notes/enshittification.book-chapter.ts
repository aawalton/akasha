import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const enshittification = {
  id: "01a06594-c679-7002-87e4-f0f7fa3ea27a",
  pageTypeSlug: "book-chapter",
  slug: "enshittification",
  title: "Enshittification",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
