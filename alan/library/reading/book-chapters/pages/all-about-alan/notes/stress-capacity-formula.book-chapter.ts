import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const stressCapacityFormula = {
  id: "01a06594-c684-7012-b049-2b1694055b98",
  pageTypeSlug: "book-chapter",
  slug: "stress-capacity-formula",
  title: "Stress-capacity formula",
  description:
    "Stress-capacity cost formula — difficulty levels, multiplier table, anchor unit, cost base tiers.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
