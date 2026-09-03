import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const closenessParadox = {
  id: "01a06594-c676-700b-8ada-79196b7ec20b",
  pageTypeSlug: "book-chapter",
  slug: "closeness-paradox",
  title: "The closeness paradox",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
