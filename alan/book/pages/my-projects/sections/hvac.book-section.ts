import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const hvac = {
  id: "01a06594-c68d-7005-8efb-da504a454ad7",
  type: "page-type/book-section",
  slug: "hvac",
  title: "Space Heating + Cooling (Heat Pump)",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Heat pump space heating and cooling demand for a 6000 sq ft Provo home — heat-loss math, COP-vs-outdoor-temp integration, well-insulated vs. existing-house cases.",
  partOfCollections: ["book-section/solar-power/energy-demand", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
