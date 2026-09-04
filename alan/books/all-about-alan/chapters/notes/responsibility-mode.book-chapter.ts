import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const responsibilityMode = {
  id: "01a06594-c67c-7010-9dde-28ffbedb9700",
  pageTypeSlug: "book-chapter",
  slug: "responsibility-mode",
  title: "Responsibility Mode",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
