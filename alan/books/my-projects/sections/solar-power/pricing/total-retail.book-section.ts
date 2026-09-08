import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const totalRetail = {
  id: "01a06594-c68e-7003-8dca-ddfdf606eb5f",
  pageTypeSlug: "book-section",
  slug: "total-retail",
  title: "Total Retail $/W",
  sectionOfSlug: "book-section/solar-power/pricing",
  description: "Residential solar total retail $/W — national and Utah, cash vs financed.",
  partOfCollectionSlugs: ["book-section/solar-power/pricing"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
