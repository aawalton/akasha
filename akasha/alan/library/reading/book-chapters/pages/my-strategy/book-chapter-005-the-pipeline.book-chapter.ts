import type { BookChapter } from "../../book-chapter.page-type.ts"

export const bookChapter005ThePipeline = {
  id: "01a06594-c68f-7005-9894-51d332cff538",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-005-the-pipeline",
  title: "The pipeline",
  position: 5,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
