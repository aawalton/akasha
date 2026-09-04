import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const encodingMechanism = {
  id: "01a06594-c679-7000-9e70-9037a1e4b979",
  pageTypeSlug: "book-chapter",
  slug: "encoding-mechanism",
  title: "Encoding mechanism",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
