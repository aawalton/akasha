import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const stressCapacityFormula = {
  id: "01a06594-c684-7012-b049-2b1694055b98",
  type: "book-section",
  slug: "stress-capacity-formula",
  title: "Stress-capacity formula",
  sectionOf: "alan-book/all-about-alan",
  description:
    "Stress-capacity cost formula — difficulty levels, multiplier table, anchor unit, cost base tiers.",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
