import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const aelwyn = {
  id: "01a06594-c686-7007-8db3-b12191ad3b63",
  pageTypeSlug: "book-chapter",
  slug: "aelwyn",
  title: "Aelwyn",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
