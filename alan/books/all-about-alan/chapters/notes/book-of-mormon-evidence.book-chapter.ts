import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const bookOfMormonEvidence = {
  id: "01a06594-c675-7015-85dd-2d7913784b1e",
  pageTypeSlug: "book-chapter",
  slug: "book-of-mormon-evidence",
  title: "Book of Mormon evidence",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
