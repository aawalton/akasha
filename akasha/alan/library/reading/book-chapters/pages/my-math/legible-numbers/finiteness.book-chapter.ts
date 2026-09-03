import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const finiteness = {
  id: "01a06594-c68e-7011-93aa-6503b1220d97",
  pageTypeSlug: "book-chapter",
  slug: "finiteness",
  title: "The legible set is finite, and almost every real is illegible",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
