import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const ali = {
  id: "01a06594-c686-7009-9a69-2df478fe3a57",
  pageTypeSlug: "book-chapter",
  slug: "ali",
  title: "Ali",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
