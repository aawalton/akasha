import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const selfWorthAdapter = {
  id: "01a06594-c683-7009-ac2e-3b6ebcf01ada",
  pageTypeSlug: "book-chapter",
  slug: "self-worth-adapter",
  title: "The self-worth adapter",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
