import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const customerGeneration = {
  id: "01a06594-c68c-700d-965d-0b6550e4d2d0",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "customer-generation",
  title: "Customer Generation — Provo Power",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Provo Power net-metering / customer-generation program — compensation mechanism, system size cap, annual reset, interconnection. Plus federal ITC status check.",
  partOfCollections: ["book-section/my-projects/solar-power", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
