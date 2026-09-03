import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const alexithymia = {
  id: "01a06594-c674-7009-ad7b-360c43244013",
  pageTypeSlug: "book-chapter",
  slug: "alexithymia",
  title: "Alexithymia",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
