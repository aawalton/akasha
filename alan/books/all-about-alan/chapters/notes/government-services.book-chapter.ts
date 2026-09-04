import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const governmentServices = {
  id: "01a06594-c67a-7000-8c5e-a807d85056b0",
  pageTypeSlug: "book-chapter",
  slug: "government-services",
  title: "Government services",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
