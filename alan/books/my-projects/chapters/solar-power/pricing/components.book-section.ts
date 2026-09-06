import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const components = {
  id: "01a06594-c68e-7000-9811-ea8e7649811d",
  pageTypeSlug: "book-section",
  slug: "components",
  title: "Component Breakdown",
  description:
    "Component breakdown of residential solar $/W — NREL Q1 2024 benchmark for 8 kW system, plus inverter and battery line items.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
