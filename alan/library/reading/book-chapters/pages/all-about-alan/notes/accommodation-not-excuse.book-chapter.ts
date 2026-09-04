import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const accommodationNotExcuse = {
  id: "01a06594-c674-7004-a42c-c1af0b58123b",
  pageTypeSlug: "book-chapter",
  slug: "accommodation-not-excuse",
  title: "Accommodation, not excuse",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
