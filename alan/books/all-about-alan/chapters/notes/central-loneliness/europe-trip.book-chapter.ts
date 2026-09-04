import type { BookChapter } from "../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const europeTrip = {
  id: "01a06594-c676-7002-889a-0afd9f3ed2a4",
  pageTypeSlug: "book-chapter",
  slug: "europe-trip",
  title: "The Europe trip",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
