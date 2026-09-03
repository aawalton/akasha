import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const theHierarchy = {
  id: "01a06594-c68e-7016-93ec-ab98c91a950c",
  pageTypeSlug: "book-chapter",
  slug: "the-hierarchy",
  title: "The hierarchy, and the index on the word",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
