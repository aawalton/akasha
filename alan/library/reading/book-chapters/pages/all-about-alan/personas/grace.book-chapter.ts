import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const grace = {
  id: "01a06594-c686-7013-befd-e5828d96b99d",
  pageTypeSlug: "book-chapter",
  slug: "grace",
  title: "Grace",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
