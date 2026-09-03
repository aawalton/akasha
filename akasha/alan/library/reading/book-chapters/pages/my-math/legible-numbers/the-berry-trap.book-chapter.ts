import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const theBerryTrap = {
  id: "01a06594-c68e-7015-8832-15be56d3632d",
  pageTypeSlug: "book-chapter",
  slug: "the-berry-trap",
  title: "The Berry trap",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
