import type { BookChapter } from "../../book-chapter.page-type.ts"

export const bookChapter001Apology = {
  id: "01a06594-c68f-700c-9128-592393371e5c",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-001-apology",
  title: "Apology",
  status: "completed",
  ownLength: 11346,
  position: 1,
  partOfSlugs: ["plato-apology-crito"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
