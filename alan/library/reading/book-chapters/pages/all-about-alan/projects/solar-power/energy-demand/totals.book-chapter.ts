import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const totals = {
  id: "01a06594-c68d-7008-a12a-9c6702c235d8",
  pageTypeSlug: "book-chapter",
  slug: "totals",
  title: "Totals",
  description:
    "Aggregate annual energy demand, monthly distribution table, peak demand stack, service-panel sizing implications for the all-electric Provo home.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
