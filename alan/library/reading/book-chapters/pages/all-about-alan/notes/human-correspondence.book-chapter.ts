import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const humanCorrespondence = {
  id: "01a06594-c67a-7009-a4db-f8d25dd2bf49",
  pageTypeSlug: "book-chapter",
  slug: "human-correspondence",
  title: "Human correspondence",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
