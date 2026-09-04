import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const beingKnownSupply = {
  id: "01a06594-c675-7013-b608-11ac47f2fad5",
  pageTypeSlug: "book-chapter",
  slug: "being-known-supply",
  title: "Being-known supply",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
