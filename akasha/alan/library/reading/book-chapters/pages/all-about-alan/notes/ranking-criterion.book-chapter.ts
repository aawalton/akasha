import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const rankingCriterion = {
  id: "01a06594-c67c-7008-9fc3-7aaf79d67a80",
  pageTypeSlug: "book-chapter",
  slug: "ranking-criterion",
  title: "Ranking criterion",
  description:
    "Risk-adjusted exposure as the ranking criterion — criticality × enshittification likelihood × switching cost. High on all three is top priority; low on any one drops the item down the queue.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
