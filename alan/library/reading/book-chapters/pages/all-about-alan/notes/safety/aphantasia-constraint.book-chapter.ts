import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const aphantasiaConstraint = {
  id: "01a06594-c67e-7001-b9f9-775f31ca7746",
  pageTypeSlug: "book-chapter",
  slug: "aphantasia-constraint",
  title: "Safety — the aphantasia constraint on intervention design",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
