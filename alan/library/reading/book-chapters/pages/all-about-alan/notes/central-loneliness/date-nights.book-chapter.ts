import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const dateNights = {
  id: "01a06594-c676-7000-ab98-f51006094a4c",
  pageTypeSlug: "book-chapter",
  slug: "date-nights",
  title: "The two date nights",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
