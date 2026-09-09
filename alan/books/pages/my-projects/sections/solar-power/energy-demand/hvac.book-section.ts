import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const hvac = {
  id: "01a06594-c68d-7005-8efb-da504a454ad7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "hvac",
  title: "Space Heating + Cooling (Heat Pump)",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Heat pump space heating and cooling demand for a 6000 sq ft Provo home — heat-loss math, COP-vs-outdoor-temp integration, well-insulated vs. existing-house cases.",
  partOfCollections: ["book-section/solar-power/energy-demand", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
