import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const sizing = {
  id: "01a06594-c68e-700c-9a9c-c6e3f9ee0198",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sizing",
  title: "Sizing",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Annual net-zero sizing math for the solar power project — PV, battery, inverter, service panel, roof area, and cost stack with one planning-case recommendation.",
  partOfCollections: ["book-section/my-projects/solar-power"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
