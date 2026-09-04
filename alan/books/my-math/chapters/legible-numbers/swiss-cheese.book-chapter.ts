import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const swissCheese = {
  id: "01a06594-c68e-7014-adba-e57d0e73f61c",
  pageTypeSlug: "book-chapter",
  slug: "swiss-cheese",
  title: "The legible integers are Swiss cheese",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
