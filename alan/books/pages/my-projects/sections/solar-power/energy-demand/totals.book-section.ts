import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const totals = {
  id: "01a06594-c68d-7008-a12a-9c6702c235d8",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "totals",
  title: "Totals",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Aggregate annual energy demand, monthly distribution table, peak demand stack, service-panel sizing implications for the all-electric Provo home.",
  partOfCollections: ["book-section/solar-power/energy-demand"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
