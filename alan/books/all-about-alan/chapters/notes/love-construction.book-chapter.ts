import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const loveConstruction = {
  id: "01a06594-c67b-7000-ad2b-10fe1c316be7",
  pageTypeSlug: "book-chapter",
  slug: "love-construction",
  title: "Love construction",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
