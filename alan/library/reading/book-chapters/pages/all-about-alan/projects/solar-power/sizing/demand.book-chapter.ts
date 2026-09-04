import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const demand = {
  id: "01a06594-c68e-7008-8829-59a74d13b6e1",
  pageTypeSlug: "book-chapter",
  slug: "demand",
  title: "Revised Annual Demand (Iteration 2)",
  description:
    "Iteration-2 revised annual demand — flag-loads removed, low-end EV miles applied, home lab folded into the 12 PCs, inference upside flagged.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
