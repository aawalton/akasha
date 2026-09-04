import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const jenReading = {
  id: "01a06594-c676-7004-a164-d2ba4de87164",
  pageTypeSlug: "book-chapter",
  slug: "jen-reading",
  title: "The Jen reading",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
