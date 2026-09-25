import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const math = {
  id: "01a06594-c68d-700f-bfe9-858870eb06bd",
  type: "page-type/book-section",
  slug: "math",
  title: "Heating-Load Reduction → PV Sizing Math",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Heating-load-reduction math — retrofit % → kWh/yr saved → PV kWp removed → dollars. Compares envelope-first, solar-first, and parallel orderings.",
  partOfCollections: ["book-section/solar-power/envelope", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
