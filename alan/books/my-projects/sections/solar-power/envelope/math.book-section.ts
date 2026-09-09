import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const math = {
  id: "01a06594-c68d-700f-bfe9-858870eb06bd",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "math",
  title: "Heating-Load Reduction → PV Sizing Math",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Heating-load-reduction math — retrofit % → kWh/yr saved → PV kWp removed → dollars. Compares envelope-first, solar-first, and parallel orderings.",
  partOfCollections: ["book-section/solar-power/envelope"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
