import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const zeli = {
  id: "01a06594-c687-700c-9125-8d91b51525c1",
  pageTypeSlug: "book-chapter",
  slug: "zeli",
  title: "Zeli",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
