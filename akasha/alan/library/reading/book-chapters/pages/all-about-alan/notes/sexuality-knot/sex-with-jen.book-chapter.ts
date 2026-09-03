import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const sexWithJen = {
  id: "01a06594-c683-7011-8e49-5f523380a909",
  pageTypeSlug: "book-chapter",
  slug: "sex-with-jen",
  title: "Sex with Jen",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
