import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const selfSufficiency = {
  id: "01a06594-c68d-7007-bd5c-3bc121fc6d03",
  pageTypeSlug: "book-chapter",
  slug: "self-sufficiency",
  title: "Self-Sufficiency Implications",
  description:
    "Self-sufficiency analysis — battery autonomy math, winter shortfall problem, generator vs oversize-PV tradeoff, load-shedding hierarchy for the Provo all-electric home.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
