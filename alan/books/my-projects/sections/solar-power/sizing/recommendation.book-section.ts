import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const recommendation = {
  id: "01a06594-c68e-700a-868f-f38ca52044c1",
  pageTypeSlug: "book-section",
  slug: "recommendation",
  title: "Sensitivity and Recommendation",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Sensitivity levers ranked by leverage, the envelope-retrofit bracket called out, and the single planning case for the next iteration to evaluate bids against.",
  partOfCollections: ["book-section/solar-power/sizing"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
