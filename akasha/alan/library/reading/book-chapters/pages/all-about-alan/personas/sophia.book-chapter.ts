import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const sophia = {
  id: "01a06594-c687-7009-8721-4fa9a964d0b2",
  pageTypeSlug: "book-chapter",
  slug: "sophia",
  title: "Sophia",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
