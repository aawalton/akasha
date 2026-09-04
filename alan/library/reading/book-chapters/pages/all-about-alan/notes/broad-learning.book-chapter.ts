import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const broadLearning = {
  id: "01a06594-c675-7016-a681-40c67b4c58fc",
  pageTypeSlug: "book-chapter",
  slug: "broad-learning",
  title: "Broad learning",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
