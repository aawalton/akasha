import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const journeyAsReward = {
  id: "01a06594-c67a-7015-9129-1df3e02537b9",
  pageTypeSlug: "book-chapter",
  slug: "journey-as-reward",
  title: "Journey as reward",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
