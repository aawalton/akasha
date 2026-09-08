import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const stressCapacityFormula = {
  id: "01a06594-c684-7012-b049-2b1694055b98",
  pageTypeSlug: "book-section",
  slug: "stress-capacity-formula",
  title: "Stress-capacity formula",
  sectionOfSlug: "all-about-alan",
  description:
    "Stress-capacity cost formula — difficulty levels, multiplier table, anchor unit, cost base tiers.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
