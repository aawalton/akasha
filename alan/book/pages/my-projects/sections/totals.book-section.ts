import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const totals = {
  id: "01a06594-c68d-7008-a12a-9c6702c235d8",
  type: "page-type/book-section",
  slug: "totals",
  title: "Totals",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Aggregate annual energy demand, monthly distribution table, peak demand stack, service-panel sizing implications for the all-electric Provo home.",
  partOfCollections: ["book-section/solar-power/energy-demand", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
