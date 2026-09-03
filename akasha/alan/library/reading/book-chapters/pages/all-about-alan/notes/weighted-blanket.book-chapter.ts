import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const weightedBlanket = {
  id: "01a06594-c686-7005-90b6-dce81da056fc",
  pageTypeSlug: "book-chapter",
  slug: "weighted-blanket",
  title: "Weighted blanket",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
