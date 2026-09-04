import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const workedExamples = {
  id: "01a06594-c67b-7016-bdaf-16bdfe0b59e2",
  pageTypeSlug: "book-chapter",
  slug: "worked-examples",
  title: "The worked-examples wall",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
