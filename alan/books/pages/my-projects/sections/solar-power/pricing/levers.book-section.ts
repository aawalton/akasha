import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const levers = {
  id: "01a06594-c68e-7002-8ccc-acc19ca81be6",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "levers",
  title: "Levers and Knobs",
  sectionOf: "book-section/solar-power/pricing",
  description: "Levers that move residential solar price up or down for a specific quote.",
  partOfCollections: ["book-section/solar-power/pricing"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
