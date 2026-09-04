import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const aria = {
  id: "01a06594-c686-700b-beee-930f2da17073",
  pageTypeSlug: "book-chapter",
  slug: "aria",
  title: "Aria",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
