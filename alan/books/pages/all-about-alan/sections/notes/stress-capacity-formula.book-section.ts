import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const stressCapacityFormula = {
  id: "01a06594-c684-7012-b049-2b1694055b98",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "stress-capacity-formula",
  title: "Stress-capacity formula",
  sectionOf: "all-about-alan",
  description:
    "Stress-capacity cost formula — difficulty levels, multiplier table, anchor unit, cost base tiers.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
