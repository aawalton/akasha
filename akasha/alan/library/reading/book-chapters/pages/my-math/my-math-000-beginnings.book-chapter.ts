import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const myMath000Beginnings = {
  id: "01a06591-9edd-7001-a6e9-188212a83692",
  pageTypeSlug: "book-chapter",
  slug: "my-math-000-beginnings",
  title: "My Math",
  position: 0,
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
