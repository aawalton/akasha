import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const astra = {
  id: "01a06594-c686-700c-8a62-27d37b331f77",
  pageTypeSlug: "book-chapter",
  slug: "astra",
  title: "Astra",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
