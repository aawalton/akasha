import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const relationalHistory = {
  id: "01a06594-c683-700f-b4f2-423786532d61",
  pageTypeSlug: "book-chapter",
  slug: "relational-history",
  title: "Relational history",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
