import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const costCurve = {
  id: "01a06594-c68e-7001-aac5-34abc63cc5e9",
  pageTypeSlug: "book-section",
  slug: "cost-curve",
  title: "Cost Curve — Past 15 Years",
  sectionOf: "book-section/solar-power/pricing",
  description:
    "Cost-curve history for residential solar — total retail, modules, inverters, batteries, soft costs.",
  partOfCollections: ["book-section/solar-power/pricing"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
