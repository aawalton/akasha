import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const weather = {
  id: "01a06594-c686-7004-b7b2-720b2cf3bea1",
  pageTypeSlug: "book-chapter",
  slug: "weather",
  title: "Weather",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
