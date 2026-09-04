import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const safety = {
  id: "01a06594-c682-7002-9ce1-f8926835c02b",
  pageTypeSlug: "book-chapter",
  slug: "safety",
  title: "Safety",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
