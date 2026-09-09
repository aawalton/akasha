import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const losses = {
  id: "01a06594-c68c-700f-b2ce-5ee4e44631dc",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "losses",
  title: "System Losses",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "System losses — shading, soiling, snow, temperature, mismatch, wiring, inverter, availability. The PVWatts 14.08% bucket and what's in it.",
  partOfCollections: ["book-section/solar-power/efficiency-factors"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
