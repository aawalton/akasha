import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const environmentLever = {
  id: "01a06594-c679-7003-a078-d52c615e5c15",
  pageTypeSlug: "book-chapter",
  slug: "environment-lever",
  title: "The environment lever",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
