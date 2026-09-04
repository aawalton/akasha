import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const health = {
  id: "01a06594-c67a-7004-bdf2-242c2201652d",
  pageTypeSlug: "book-chapter",
  slug: "health",
  title: "Health",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
