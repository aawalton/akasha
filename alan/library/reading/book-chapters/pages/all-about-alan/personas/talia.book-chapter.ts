import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const talia = {
  id: "01a06594-c687-700a-873d-f71418d104c9",
  pageTypeSlug: "book-chapter",
  slug: "talia",
  title: "Talia",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
