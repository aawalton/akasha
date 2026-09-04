import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const volatilityGovernor = {
  id: "01a06594-c686-7001-8c3a-414cf88a5472",
  pageTypeSlug: "book-chapter",
  slug: "volatility-governor",
  title: "Volatility governor",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
