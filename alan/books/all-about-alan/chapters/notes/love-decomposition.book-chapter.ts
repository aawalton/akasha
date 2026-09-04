import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const loveDecomposition = {
  id: "01a06594-c67b-7001-a08b-705c1a9c195c",
  pageTypeSlug: "book-chapter",
  slug: "love-decomposition",
  title: "Love decomposition",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
