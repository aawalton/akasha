import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const interestModulator = {
  id: "01a06594-c67a-7012-b964-8d98a1776caf",
  pageTypeSlug: "book-chapter",
  slug: "interest-modulator",
  title: "Interest modulator",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
