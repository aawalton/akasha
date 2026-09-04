import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const transportation = {
  id: "01a06594-c685-7008-bfff-d8c4fd92347e",
  pageTypeSlug: "book-chapter",
  slug: "transportation",
  title: "Transportation",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
