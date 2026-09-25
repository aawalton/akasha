import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const customerGeneration = {
  id: "01a06594-c68c-700d-965d-0b6550e4d2d0",
  type: "page-type/book-section",
  slug: "customer-generation",
  title: "Customer Generation — Provo Power",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Provo Power net-metering / customer-generation program — compensation mechanism, system size cap, annual reset, interconnection. Plus federal ITC status check.",
  partOfCollections: ["book-section/my-projects/solar-power", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
