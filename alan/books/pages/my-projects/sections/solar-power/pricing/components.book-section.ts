import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const components = {
  id: "01a06594-c68e-7000-9811-ea8e7649811d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "components",
  title: "Component Breakdown",
  sectionOf: "book-section/solar-power/pricing",
  description:
    "Component breakdown of residential solar $/W — NREL Q1 2024 benchmark for 8 kW system, plus inverter and battery line items.",
  partOfCollections: ["book-section/solar-power/pricing", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
