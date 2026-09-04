import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const music = {
  id: "01a06594-c67b-700b-91eb-b7259ce4c0e7",
  pageTypeSlug: "book-chapter",
  slug: "music",
  title: "Music as cross-cutting bridge",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
