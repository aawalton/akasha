import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const dreams = {
  id: "01a06594-c677-7013-9893-21cf00c07803",
  pageTypeSlug: "book-chapter",
  slug: "dreams",
  title: "Dreams",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
