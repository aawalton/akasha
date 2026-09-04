import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const provableLegibility = {
  id: "01a06594-c68e-7013-92bd-29e9e15cc177",
  pageTypeSlug: "book-chapter",
  slug: "provable-legibility",
  title: "Provable legibility",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
