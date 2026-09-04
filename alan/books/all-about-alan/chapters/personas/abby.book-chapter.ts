import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const abby = {
  id: "01a06594-c686-7006-a263-17503d3c33ab",
  pageTypeSlug: "book-chapter",
  slug: "abby",
  title: "Abby",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
