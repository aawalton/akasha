import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const costCurve = {
  id: "01a06594-c68e-7001-aac5-34abc63cc5e9",
  type: "page-type/book-section",
  slug: "cost-curve",
  title: "Cost Curve — Past 15 Years",
  sectionOf: "book-section/solar-power/pricing",
  description:
    "Cost-curve history for residential solar — total retail, modules, inverters, batteries, soft costs.",
  partOfCollections: ["book-section/solar-power/pricing", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.110Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
