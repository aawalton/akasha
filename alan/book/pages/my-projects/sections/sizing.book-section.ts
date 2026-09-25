import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const sizing = {
  id: "01a06594-c68e-700c-9a9c-c6e3f9ee0198",
  type: "page-type/book-section",
  slug: "sizing",
  title: "Sizing",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Sizing math for the solar power project — PV, battery, inverter, service panel, roof area, and cost stack with one planning-case recommendation.",
  partOfCollections: ["book-section/my-projects/solar-power", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
