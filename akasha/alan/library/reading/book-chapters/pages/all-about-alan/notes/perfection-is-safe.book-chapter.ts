import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const perfectionIsSafe = {
  id: "01a06594-c67c-7000-abb1-7fec74def8d3",
  pageTypeSlug: "book-chapter",
  slug: "perfection-is-safe",
  title: "Only perfection is safe",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
