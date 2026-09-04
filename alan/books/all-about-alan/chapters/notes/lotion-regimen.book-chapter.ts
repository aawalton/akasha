import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const lotionRegimen = {
  id: "01a06594-c67a-701a-9e3c-29d2d89e2c7a",
  pageTypeSlug: "book-chapter",
  slug: "lotion-regimen",
  title: "Lotion regimen",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
