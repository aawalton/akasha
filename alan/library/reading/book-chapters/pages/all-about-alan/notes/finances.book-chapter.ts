import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const finances = {
  id: "01a06594-c679-700e-a250-575c71312a7d",
  pageTypeSlug: "book-chapter",
  slug: "finances",
  title: "Finances",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
