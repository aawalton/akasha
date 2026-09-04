import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const food = {
  id: "01a06594-c679-7010-8ee4-24ff74080d7e",
  pageTypeSlug: "book-chapter",
  slug: "food",
  title: "Food",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
