import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const testingAndTheSeed = {
  id: "01a06594-c685-7002-83e2-32286a83802a",
  pageTypeSlug: "book-chapter",
  slug: "testing-and-the-seed",
  title: "Testing and the seed",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
