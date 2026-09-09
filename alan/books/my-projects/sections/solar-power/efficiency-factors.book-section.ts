import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const efficiencyFactors = {
  id: "01a06594-c68d-7003-b765-d0f850b5a956",
  pageTypeSlug: "book-section",
  slug: "efficiency-factors",
  title: "Rooftop Solar Efficiency Factors (Provo, UT)",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Mechanical decomposition of rooftop solar efficiency factors — from atmospheric irradiance to AC power at the meter — calibrated for Provo, UT.",
  partOfCollections: ["book-section/my-projects/solar-power"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
