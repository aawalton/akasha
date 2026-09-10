import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const totalRetail = {
  id: "01a06594-c68e-7003-8dca-ddfdf606eb5f",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "total-retail",
  title: "Total Retail $/W",
  sectionOf: "book-section/solar-power/pricing",
  description: "Residential solar total retail $/W — national and Utah, cash vs financed.",
  partOfCollections: ["book-section/solar-power/pricing", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
