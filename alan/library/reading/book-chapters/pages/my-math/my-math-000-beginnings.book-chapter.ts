import type { BookChapter } from "../../book-chapter.page-type.ts"

export const myMath000Beginnings = {
  id: "01a06594-c68e-700e-9219-31c312a83692",
  pageTypeSlug: "book-chapter",
  slug: "my-math-000-beginnings",
  title: "My Math",
  position: 0,
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
