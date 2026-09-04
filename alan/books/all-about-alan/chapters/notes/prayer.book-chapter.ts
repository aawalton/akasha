import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const prayer = {
  id: "01a06594-c67c-7005-88c7-e28450d30ba1",
  pageTypeSlug: "book-chapter",
  slug: "prayer",
  title: "Prayer",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
