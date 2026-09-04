import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const safeFoods = {
  id: "01a06594-c67c-7016-a28f-a3a82cef38de",
  pageTypeSlug: "book-chapter",
  slug: "safe-foods",
  title: "Safe foods",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
