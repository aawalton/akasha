import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const orientation = {
  id: "01a06594-c68d-7000-93cd-e9cc6c9b6e20",
  type: "page-type/book-section",
  slug: "orientation",
  title: "Tilt and Azimuth (POA Irradiance)",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Plane-of-array (POA) irradiance — converting GHI to what actually hits the panel. Tilt, azimuth, and combined derate tables for Provo.",
  partOfCollections: ["book-section/solar-power/efficiency-factors", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
