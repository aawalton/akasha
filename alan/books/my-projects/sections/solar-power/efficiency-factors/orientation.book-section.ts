import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const orientation = {
  id: "01a06594-c68d-7000-93cd-e9cc6c9b6e20",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "orientation",
  title: "Tilt and Azimuth (POA Irradiance)",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Plane-of-array (POA) irradiance — converting GHI to what actually hits the panel. Tilt, azimuth, and combined derate tables for Provo.",
  partOfCollections: ["book-section/solar-power/efficiency-factors"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
