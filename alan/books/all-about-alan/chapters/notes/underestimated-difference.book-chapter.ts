import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const underestimatedDifference = {
  id: "01a06594-c685-700c-bf84-4e3291bc4b34",
  pageTypeSlug: "book-chapter",
  slug: "underestimated-difference",
  title: "Underestimated difference",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
