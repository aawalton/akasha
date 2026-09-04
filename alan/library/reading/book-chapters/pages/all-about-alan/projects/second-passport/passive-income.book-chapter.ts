import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const passiveIncome = {
  id: "01a06594-c68c-700c-a4ca-f059f98020e1",
  pageTypeSlug: "book-chapter",
  slug: "passive-income",
  title: "Passive Income",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
