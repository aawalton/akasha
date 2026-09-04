import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const awen = {
  id: "01a06594-c686-700e-9cff-83905d41179b",
  pageTypeSlug: "book-chapter",
  slug: "awen",
  title: "Awen",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
