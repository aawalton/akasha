import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const threeSelves = {
  id: "01a06594-c685-7005-ac68-60f81e408004",
  pageTypeSlug: "book-chapter",
  slug: "three-selves",
  title: "The three selves",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
