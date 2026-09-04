import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const fun = {
  id: "01a06594-c679-7013-b6f5-9640c8b9b691",
  pageTypeSlug: "book-chapter",
  slug: "fun",
  title: "Fun",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
