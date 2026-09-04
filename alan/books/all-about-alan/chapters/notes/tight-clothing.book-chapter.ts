import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const tightClothing = {
  id: "01a06594-c685-7006-8a78-5686d9bfcb71",
  pageTypeSlug: "book-chapter",
  slug: "tight-clothing",
  title: "Tight clothing",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
