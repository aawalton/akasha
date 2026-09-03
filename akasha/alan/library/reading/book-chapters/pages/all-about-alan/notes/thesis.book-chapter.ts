import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const thesis = {
  id: "01a06594-c685-7004-a3ae-84bca69080ef",
  pageTypeSlug: "book-chapter",
  slug: "thesis",
  title: "Thesis",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
