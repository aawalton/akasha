import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const handCompilationPipeline = {
  id: "01a06594-c684-700c-8743-ce74889caaf3",
  pageTypeSlug: "book-chapter",
  slug: "hand-compilation-pipeline",
  title: "Hand-compilation pipeline",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
