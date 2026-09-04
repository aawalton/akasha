import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const pv = {
  id: "01a06594-c68e-7009-a59b-6648b4222722",
  pageTypeSlug: "book-chapter",
  slug: "pv",
  title: "PV Sizing for Annual Net-Zero",
  description:
    "PV DC kWp sizing — Provo specific yield, real-roof derate stack, ILR, mid-life degradation; demand × yield sensitivity table; roof-area feasibility.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
