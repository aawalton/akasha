import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const recommendation = {
  id: "01a06594-c68e-700a-868f-f38ca52044c1",
  type: "page-type/book-section",
  slug: "recommendation",
  title: "Sensitivity and Recommendation",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Sensitivity levers ranked by leverage, the envelope-retrofit bracket called out, and the single planning case for the next iteration to evaluate bids against.",
  partOfCollections: ["book-section/solar-power/sizing", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
