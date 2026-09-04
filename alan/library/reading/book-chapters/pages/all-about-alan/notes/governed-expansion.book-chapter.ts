import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const governedExpansion = {
  id: "01a06594-c679-7015-acbd-8ca35271a0bf",
  pageTypeSlug: "book-chapter",
  slug: "governed-expansion",
  title: "The Level-5 tell and governed expansion",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
