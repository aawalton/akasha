import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const demand = {
  id: "01a06594-c68e-7008-8829-59a74d13b6e1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "demand",
  title: "Revised Annual Demand (Iteration 2)",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Iteration-2 revised annual demand — flag-loads removed, low-end EV miles applied, home lab folded into the 12 PCs, inference upside flagged.",
  partOfCollections: ["book-section/solar-power/sizing"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
