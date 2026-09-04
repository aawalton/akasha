import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const beingKnownCost = {
  id: "01a06594-c675-7012-9692-169389c12da2",
  pageTypeSlug: "book-chapter",
  slug: "being-known-cost",
  title: "Being-known cost",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
