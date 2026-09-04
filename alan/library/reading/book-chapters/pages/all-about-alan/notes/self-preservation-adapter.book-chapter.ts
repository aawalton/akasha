import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const selfPreservationAdapter = {
  id: "01a06594-c683-7007-b5a8-071a23a765b1",
  pageTypeSlug: "book-chapter",
  slug: "self-preservation-adapter",
  title: "The self-preservation adapter",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
