import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const selfArchitecture = {
  id: "01a06594-c683-7001-8dd9-480e1d7c508f",
  pageTypeSlug: "book-chapter",
  slug: "self-architecture",
  title: "Self-architecture",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
