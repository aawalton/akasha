import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const connection = {
  id: "01a06594-c677-7004-be1f-d41df99ede57",
  pageTypeSlug: "book-chapter",
  slug: "connection",
  title: "Connection",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
